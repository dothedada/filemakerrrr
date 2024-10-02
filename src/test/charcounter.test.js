import { describe, it, expect } from 'vitest';
import { stringChecker } from '../charcounter.js';

describe('stringChecker only accept strings', () => {
    it('accepts strings', () => {
        expect(() => stringChecker('123')).not.toThrowError();
    });

    it('throws error if something different of string is pass as parameter', () => {
        expect(() => stringChecker(123)).toThrowError('Input must be a string');
    });
});

describe('StringChecker returns...', () => {
    it('returns an object', () => {
        const stringEvaluation = stringChecker('abc');

        expect(typeof stringEvaluation === 'object').toBe(true);
        expect(Array.isArray(stringEvaluation)).toBe(false);
    });

    it('has 3 keys, stringLength, charactersUsed, charactersUsedLength', () => {
        const stringEvaluation = stringChecker('abc');

        expect('stringLength' in stringEvaluation).toBe(true);
        expect('charactersUsedLength' in stringEvaluation).toBe(true);
        expect('charactersUsed' in stringEvaluation).toBe(true);
    });

    const stringShort = 'The quick brown fox jumps over the lazy dog.';
    const stringLong =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.';
    const stringLineJumps = `This is a message that spans
over three different lines.
It should have exactly 100 characters
to meet the requirement set.`;
    const testShortString = stringChecker(stringShort);
    const testLongString = stringChecker(stringLong);
    const testLineJump = stringChecker(stringLineJumps);

    it('Returns the number of the total characters in the string', () => {
        expect(typeof testShortString.stringLength).toBe('number');
        expect(testShortString.stringLength).toBe(stringShort.length);
        expect(testLongString.stringLength).toBe(stringLong.length);
        expect(testLineJump.stringLength).toBe(stringLineJumps.length);
    });

    it('Returns the number of diferent characters in the string, includes special characters', () => {
        expect(typeof testShortString.charactersUsedLength).toBe('number');
        expect(testShortString.charactersUsedLength).toBe(29);
        expect(testLongString.charactersUsedLength).toBe(29);
        expect(testLineJump.charactersUsedLength).toBe(28);
    });

    it('Returns a map with the characters used as keys and the appearences as value', () => {
        expect(testLineJump.charactersUsed instanceof Map).toBe(true);

        expect(testLineJump.charactersUsed.get('\n')).toBe(3);
        expect(testLongString.charactersUsed.get('U')).toBe(1);
        expect(testLongString.charactersUsed.get('u')).toBe(27);
        expect(testShortString.charactersUsed.get(' ')).toBe(8);
    });
});
