import { describe, test, it, expect } from 'vitest';
import { fileHeader } from '../fileHeader';
import { version } from '../units';
import { toBin } from '../toBinary';

const versionBin = toBin(version, 4);
describe('Data input for the fileHeader', () => {
    it('throws error if any parameters is missing', () => {
        expect(() => fileHeader()).toThrowError();
        expect(() => fileHeader([])).toThrowError();
        expect(() => fileHeader([], [])).toThrowError();
    });

    it('should only return the current version if all the parameters ar empty an false', () => {
        expect(fileHeader([], [], [])).toBe(`${versionBin}0000`);
    });

    it('should return the version an 1000 if it uses fixedLength compression', () => {
        expect(fileHeader([], [], [], true)).toBe(`${versionBin}1000`);
    });

    it('should return the version and 0100 if it has a character in ascii', () => {
        expect(fileHeader([''], [], [])).toBe(`${versionBin}0100`);
    });

    it('should return the version and 0010 if it has a character in ascii extended', () => {
        expect(fileHeader([], [1], [])).toBe(`${versionBin}0010`);
    });

    it('should return the version and 0001 if it has a character in unicode', () => {
        expect(fileHeader([], [], ['a'])).toBe(`${versionBin}0001`);
    });

    it('should return a binary string, no matter how many elements has any array', () => {
        const testArrLength = fileHeader(
            [1, 2, 3, 4, 5, 6, 6],
            ['1', '12', 123],
            [],
        );
        expect(/[2-9]/g.test(testArrLength)).toBe(false);
    });
});
