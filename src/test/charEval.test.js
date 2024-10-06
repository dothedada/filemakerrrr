import { describe, test, it, expect } from 'vitest';
import { charEval } from '../charEval';

describe('input for charEval', () => {
    it('throws error if no parameter is provided', () => {
        expect(() => charEval()).toThrowError();
    });

    it('throws error if the parameter is not a string', () => {
        expect(() => charEval(123)).toThrowError();
    });
});

const testMap = new Map([
    ['A', 1], // 65
    ['a', 1], // 97
    ['1', 1], // 49
    ['-', 1], // 45
    [' ', 1], // espacio 32
    ['\n', 2], // salto de línea 10
    ['\\', 2], // backslash 92
    ['\t', 2], // tabulacion horizontal 9
    ['ä', 3], // 228
    ['©', 3], // 169
    ['ç', 3], // 231
    ['∑', 4], // 8721
    ['中', 4], // 20013
    ['Δ', 4], // 916
]);

const testMapIterator = testMap.entries();

describe('output for charEval', () => {
    it('returns an object with the keys "charCode" and "standard"', () => {
        expect(typeof charEval('a')).toBe('object');
        expect('charCode' in charEval('a')).toBe(true);
        expect('standard' in charEval('a')).toBe(true);
    });

    it('returns the correct code of the character if it is ascii', () => {
        const test1 = charEval(testMapIterator.next().value[0]);
        expect(test1.charCode).toBe(65);
        expect(test1.standard).toBe('ascii');

        const test2 = charEval(testMapIterator.next().value[0]);
        expect(test2.charCode).toBe(97);
        expect(test2.standard).toBe('ascii');

        const test3 = charEval(testMapIterator.next().value[0]);
        expect(test3.charCode).toBe(49);
        expect(test3.standard).toBe('ascii');

        const test4 = charEval(testMapIterator.next().value[0]);
        expect(test4.charCode).toBe(45);
        expect(test4.standard).toBe('ascii');

        const test5 = charEval(testMapIterator.next().value[0]);
        expect(test5.charCode).toBe(32);
        expect(test5.standard).toBe('ascii');
    });

    it('returns the correct code of the character even if it is a special character', () => {
        const test1 = charEval(testMapIterator.next().value[0]);
        expect(test1.charCode).toBe(10);
        expect(test1.standard).toBe('ascii');

        const test2 = charEval(testMapIterator.next().value[0]);
        expect(test2.charCode).toBe(92);
        expect(test2.standard).toBe('ascii');

        const test3 = charEval(testMapIterator.next().value[0]);
        expect(test3.charCode).toBe(9);
        expect(test3.standard).toBe('ascii');
    });

    it('returns the correct code of the character if it is ascii extended', () => {
        const test1 = charEval(testMapIterator.next().value[0]);
        expect(test1.charCode).toBe(228);
        expect(test1.standard).toBe('ascii extended');

        const test2 = charEval(testMapIterator.next().value[0]);
        expect(test2.charCode).toBe(169);
        expect(test2.standard).toBe('ascii extended');

        const test3 = charEval(testMapIterator.next().value[0]);
        expect(test3.charCode).toBe(231);
        expect(test3.standard).toBe('ascii extended');
    });

    it('returns the correct code of the character if it is unicode', () => {
        const test1 = charEval(testMapIterator.next().value[0]);
        expect(test1.charCode).toBe(8721);
        expect(test1.standard).toBe('unicode');

        const test2 = charEval(testMapIterator.next().value[0]);
        expect(test2.charCode).toBe(20013);
        expect(test2.standard).toBe('unicode');

        const test3 = charEval(testMapIterator.next().value[0]);
        expect(test3.charCode).toBe(916);
        expect(test3.standard).toBe('unicode');
    });
});
