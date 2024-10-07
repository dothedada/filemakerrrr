import { describe, it, test, expect } from 'vitest';
import { decompressTableToBin } from '../decompressTableToBin';

const testMapEmpty = new Map();

const basicTestMap = new Map([
    ['A', '0'],
    ['b', '10'],
    [' ', '11'],
]);
const basicTestMapIterator = basicTestMap.entries();

const testMap = new Map([
    ['A', '000'], // 65
    ['a', '010'], // 97
    ['1', '1111'], // 49
    ['-', '100'], // 45
    [' ', '001'], // espacio 32
    ['\n', '1100'], // salto de línea 10
    ['\\', '1011'], // backslash 92
    ['\t', '1101'], // tabulacion horizontal 9
    ['ä', '1010'], // 228
    ['©', '0111'], // 169
    ['ç', '0110'], // 231
    ['∑', '11100'], // 8721
    ['中', '111011'], // 20013
    ['Δ', '111010'], // 916
]);

const testMapIterator = testMap.entries();
describe('decompressTableToBin takes a map...', () => {
    it('demands a parameter', () => {
        expect(() => decompressTableToBin()).toThrowError();
    });

    it('the parameter should be a string', () => {
        expect(() => decompressTableToBin(123)).toThrowError();
    });
});
describe('and returns an object...', () => {
    test('the object has "decompressBin" key', () => {
        expect('decompressBin' in decompressTableToBin(testMap)).toBe(true);
    });

    test('if the map is empty, the bin string is empty', () => {
        expect(decompressTableToBin(testMapEmpty).decompressBin).toBe(
            '0'.repeat(3), // 7bits + 8bits + 16bits
        );
    });
});
