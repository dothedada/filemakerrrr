import { describe, it, expect } from 'vitest';
import { compressor } from '../compressor';

describe('Compressor input', () => {
    it('throws error if any parameter is missing', async () => {
        await expect(() => compressor()).rejects.toThrowError();
    });

    it('it throws error if the data type is not <string> or <Map>', async () => {
        await expect(() => compressor(123, 123)).rejects.toThrowError(
            `Expected <string>, instead received <${typeof 123}>`,
        );
    });
});

const zipTable = new Map([
    ['l', '00'],
    ['H', '010'],
    [' ', '0110'],
    ['e', '0111'],
    ['!', '10'],
    ['o', '110'],
    ['i', '111'],
]);

const stringToZip = 'Holi Hello!!!';
const stringZipped = '01011000111011001001110000110101010';

describe('Compressor output', () => {
    it('returns a string', async () => {
        await expect(compressor(stringToZip, zipTable)).resolves.toBeTypeOf(
            'string',
        );
    });

    it('returns a binary secuence that corresponds to the string passed through zipTable', async () => {
        const compressedStringTest = await compressor(stringToZip, zipTable);
        expect(compressedStringTest).toBe(stringZipped);
    });
});
