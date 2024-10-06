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

const testMap = {
    unzip: new Map([
        ['A', 1], // 65
        ['a', 1], // 97
        ['1', 1], // 49
        ['-', 1], // 45
        [' ', 1], // espacio 32
        ['\n', 2], // salto de línea 10
        ['\\', 2], // backslash 92
        ['\t', 2], // tabulacion horizontal 9
        ['ä', 3], // 132
        ['©', 3], // 184
        ['ç', 3], // 135
        ['∑', 4], // 8721
        ['中', 4], // 20013
        ['Δ', 4], // 916
    ]),
};

describe('output for charEval', () => {
    it('returns an object with the keys "charCode" and "standard"', () => {
        expect(typeof charEval('a')).toBe('object');
        expect('charCode' in charEval('a')).toBe(true);
        expect('standard' in charEval('a')).toBe(true);
    });
});
