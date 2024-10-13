import { describe, it, test, expect } from 'vitest';
import { arrangeChars } from '../charMapToBin';
import { toBin } from '../toBinary';

const testMapEmpty = new Map([]);

describe('ArrangeMap input', () => {
    it('throws error if no parameter is provided or the parameter is not a Map', () => {
        expect(() => arrangeChars()).toThrowError();
        expect(() => arrangeChars(123)).toThrowError();
    });
});

describe('arrangeMap output', () => {
    it('returns an object with the "ascii", "asciiExt" and "unicode" keys for arrays', () => {
        const emptyChar = arrangeChars(testMapEmpty);
        expect(typeof emptyChar).toBe('object');
        expect('ascii' in emptyChar).toBe(true);
        expect('asciiExt' in emptyChar).toBe(true);
        expect('unicode' in emptyChar).toBe(true);
        expect(Array.isArray(emptyChar.ascii)).toBe(true);
        expect(Array.isArray(emptyChar.asciiExt)).toBe(true);
        expect(Array.isArray(emptyChar.unicode)).toBe(true);
    });
});

describe('ascii compression anatomy', () => {
    const char = 'a';
    const testMap = new Map([[char, '101']]);
    const charsInGroups = arrangeChars(testMap);
    const charCompressedLength = testMap.get('a').length;

    test('if a ascii character with the compression value of 101 is passed, the value in the ascii array shoul have a length of 14', () => {
        expect(charsInGroups.ascii[0].length).toBe(14);
    });

    test('the first 7 characters, should be the charcode', () => {
        const charBin = toBin(char.charCodeAt(0).toString(2), 7);
        const arrangedCharBin = charsInGroups.ascii[0].slice(0, 7);

        expect(arrangedCharBin).toBe(charBin);
    });
    test('the next 4 characters should be the length of the compressed value', () => {
        const charLengthBin = toBin(charCompressedLength, 4);
        const arrangedCharBin = charsInGroups.ascii[0].slice(7, 11);

        expect(arrangedCharBin).toBe(charLengthBin);
    });
    test('and the last section shoul have the length especified an correspond to de compressed value', () => {
        const lastChunkSize = charsInGroups.ascii[0].slice(7, 11);
        const compressedSize = Number.parseInt(lastChunkSize, 2);
        const compressedBin = charsInGroups.ascii[0].slice(
            11,
            11 + compressedSize,
        );
        expect(compressedBin).toBe(testMap.get('a'));
    });
});

describe('asciiExt compression anatomy', () => {
    const char = 'á';
    const testMap = new Map([[char, '111']]);
    const charsInGroups = arrangeChars(testMap);
    const charCompressedLength = testMap.get('á').length;

    test('if a asciiExt character with the compression value of 101 is passed, the value in the asciiExt array shoul have a length of 15', () => {
        expect(charsInGroups.asciiExt[0].length).toBe(15);
    });

    test('the first 8 characters, should be the charcode', () => {
        const charBin = toBin(char.charCodeAt(0).toString(2), 8);
        const arrangedCharBin = charsInGroups.asciiExt[0].slice(0, 8);

        expect(arrangedCharBin).toBe(charBin);
    });
    test('the next 4 characters should be the length of the compressed value', () => {
        const charLengthBin = toBin(charCompressedLength, 4);
        const arrangedCharBin = charsInGroups.asciiExt[0].slice(8, 12);

        expect(arrangedCharBin).toBe(charLengthBin);
    });
    test('and the last section shoul have the length especified an correspond to de compressed value', () => {
        const lastChunkSize = charsInGroups.asciiExt[0].slice(8, 12);
        const compressedSize = Number.parseInt(lastChunkSize, 2);
        const compressedBin = charsInGroups.asciiExt[0].slice(
            11,
            11 + compressedSize,
        );
        expect(compressedBin).toBe(testMap.get('á'));
    });
});

describe('unicode compression anatomy', () => {
    const char = '中';
    const testMap = new Map([[char, '11011']]);
    const charsInGroups = arrangeChars(testMap);
    const charCompressedLength = testMap.get('中').length;

    test('if a unicode character with the compression value of 110 is passed, the value in the unicode array shoul have a length of 25', () => {
        expect(charsInGroups.unicode[0].length).toBe(25);
    });

    test('the first 16 characters, should be the charcode', () => {
        const charBin = toBin(char.charCodeAt(0).toString(2), 16);
        const arrangedCharBin = charsInGroups.unicode[0].slice(0, 16);

        expect(arrangedCharBin).toBe(charBin);
    });
    test('the next 4 characters should be the length of the compressed value', () => {
        const charLengthBin = toBin(charCompressedLength, 4);
        const arrangedCharBin = charsInGroups.unicode[0].slice(16, 20);

        expect(arrangedCharBin).toBe(charLengthBin);
    });
    test('and the last section shoul have the length especified an correspond to de compressed value', () => {
        const lastChunkSize = charsInGroups.unicode[0].slice(16, 20);
        const compressedSize = Number.parseInt(lastChunkSize, 2);
        const compressedBin = charsInGroups.unicode[0].slice(
            20,
            20 + compressedSize,
        );
        expect(compressedBin).toBe(testMap.get('中'));
    });
});
