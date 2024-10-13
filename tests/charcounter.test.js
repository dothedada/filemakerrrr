import { describe, it, expect } from 'vitest';
import { stringChecker } from '../charcounter.js';

describe('stringChecker only accept strings', () => {
    it('accepts strings', () => {
        expect(() => stringChecker('123')).not.toThrowError();
    });

    it('throws error if something different of string is pass as parameter', async () => {
        await expect(() => stringChecker(123)).rejects.toThrowError(
            `Expected <string>, instead received <${typeof 123}>`,
        );
    });
});

describe('StringChecker returns...', () => {
    it('returns an object', async () => {
        const stringEvaluation = await stringChecker('abc');

        expect(typeof stringEvaluation === 'object').toBe(true);
        expect(Array.isArray(stringEvaluation)).toBe(false);
    });

    it('has 2 keys, charsMap and charsUnicode', async () => {
        const stringEvaluation = await stringChecker('abc');

        expect('charsMap' in stringEvaluation).toBe(true);
        expect('charsUnicode' in stringEvaluation).toBe(true);
    });

    const stringShort = 'The quick brown fox jumps over the lazy dog.';
    const stringLong =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.';
    const stringLineJumps = `This is a message that spans
over three different lines.
It should have exactly 100 characters
to meet the requirement set.`;

    it('Returns a map with the characters used as keys and the appearences as value', async () => {
        const testShortString = await stringChecker(stringShort);
        const testLongString = await stringChecker(stringLong);
        const testLineJump = await stringChecker(stringLineJumps);
        expect(testLineJump.charsMap instanceof Map).toBe(true);

        expect(testLineJump.charsMap.get('\n')).toBe(3);
        expect(testLongString.charsMap.get('U')).toBe(1);
        expect(testLongString.charsMap.get('u')).toBe(27);
        expect(testShortString.charsMap.get(' ')).toBe(8);
    });
});
