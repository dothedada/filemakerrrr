import { describe, it, test, expect } from 'vitest';
import { assembleHeader } from '../assembleHeader';
import { toBin } from '../toBinary';
import { version } from '../units';

const versionBin = toBin(version, 3);

const testMapEmpty = new Map();

const testMapAscii = new Map([
    ['A', '0'],
    ['\n', '103'],
    [' ', '11'],
]);

const testMapAsciiExt = new Map([
    ['ä', '101'], // 228
    ['©', '011101'], // 169
    ['ç', '0110'], // 231
]);

const testMapUnicode = new Map([
    ['∑', '11100'], // 8721
    ['中', '11'], // 20013
    ['Δ', '111010'], // 916
]);

const testMapFull = new Map([
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

describe('decompressTableToBin takes a map...', () => {
    it('demands a parameter', () => {
        expect(() => assembleHeader()).toThrowError();
    });

    it('the parameter should be a string', () => {
        expect(() => assembleHeader(123)).toThrowError();
    });
});

describe('and returns a binary string...', () => {
    it('returns a string of 1s and 0s', () => {
        expect(typeof assembleHeader(testMapEmpty)).toBe('string');
        expect(typeof assembleHeader(testMapFull)).toBe('string');
        expect(/[^0-1]/g.test(assembleHeader(testMapEmpty))).toBe(false);
        expect(/[^0-1]/g.test(assembleHeader(testMapFull))).toBe(false);
    });

    test('if the map is empty, the bin string must be only the header', () => {
        expect(assembleHeader(testMapEmpty)).toBe(
            `${versionBin}00000`, // 7bits + 8bits + 16bits
        );
    });

    test('the length of the binary string from the header using the testMapAscii should be 8directory, 7 for amount, 21 for each all charcodes, 12 for all compression lengths and 6 for the compressed values', () => {
        expect(assembleHeader(testMapAscii).length).toBe(54);
    });

    test('the length of the binary string from the header using the testMapAsciiExt should be 8directory, 8 for amount, 24 for each all charcodes, 12 for all compression lengths and 13 for the compressed values', () => {
        expect(assembleHeader(testMapAsciiExt).length).toBe(65);
    });
    test('the length of the binary string from the header using the testMapUnicode should be 8directory, 16 for amount, 42 for each all charcodes, 12 for all compression lengths and 13 for the compressed values', () => {
        expect(assembleHeader(testMapUnicode).length).toBe(97);
    });
    test('the length of the binary string from the header using the testMapUnicode should be 8directory, 16 for amount, 42 for each all charcodes, 12 for all compression lengths and 13 for the compressed values', () => {
        expect(assembleHeader(testMapFull).length).toBe(280);
    });
});
