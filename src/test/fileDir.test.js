import { describe, test, it, expect } from 'vitest';
import { fileDir } from '../fileDir';
import { version } from '../units';
import { toBin } from '../toBinary';

const versionBin = toBin(version, 3);

const emptyArrangedChars = { ascii: [], asciiExt: [], unicode: [] };

describe('Data input for the fileHeader', () => {
    it('throws error if any parameters is missing', () => {
        expect(() => fileDir()).toThrowError();
        expect(() => fileDir({})).toThrowError();
    });

    it('should only return the current version if all the parameters ar empty an false', () => {
        expect(fileDir(emptyArrangedChars)).toBe(`${versionBin}00000`);
    });

    it('should return the version an 1000 if it uses fixedLength compression', () => {
        expect(fileDir(emptyArrangedChars, true)).toBe(`${versionBin}01000`);
    });

    it('should return the version and 10100 if it has a character in ascii', () => {
        expect(fileDir([''], [], [])).toBe(`${versionBin}10100`);
    });

    it('should return the version and 10010 if it has a character in ascii extended', () => {
        expect(fileDir([], [1], [])).toBe(`${versionBin}10010`);
    });

    it('should return the version and 0001 if it has a character in unicode', () => {
        expect(fileDir([], [], ['a'])).toBe(`${versionBin}10001`);
    });

    it('should return a binary string, no matter how many elements has any array', () => {
        const testArrLength = fileDir(
            [1, 2, 3, 4, 5, 6, 6],
            ['1', '12', 123],
            [],
        );
        expect(/[^0-1]/g.test(testArrLength)).toBe(false);
    });
});
