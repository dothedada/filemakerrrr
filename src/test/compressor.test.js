import { describe, it, expect } from 'vitest';
import { compressor } from '../compressor';

describe('Compressor input', () => {
    it('throws error if any parameter is missing', () => {
        expect(() => compressor()).toThrowError();
    });

    it('it throws error if the data type is not <string> or <Map>', () => {
        expect(() => compressor(123, 123)).toThrowError(
            `Expected <string>, instead received <${typeof 123}>`,
        );
    });
});

const zipTable = {
    zip: new Map([
        ['l', '00'],
        ['H', '010'],
        [' ', '0110'],
        ['e', '0111'],
        ['!', '10'],
        ['o', '110'],
        ['i', '111'],
    ]),
};
const stringToZip = 'Holi Hello!!!';
const stringZipped = '01011000111011001001110000110101010';

describe('Compressor output', () => {
    it('returns a string', () => {
        expect(typeof compressor(stringToZip, zipTable)).toBe('string');
    });

    it('returns a binaty secuence that corresponds to the string passed through zipTable', () => {
        expect(compressor(stringToZip, zipTable)).toBe(stringZipped);
    });
});
