import { describe, test, it, expect } from 'vitest';
import { parseHeader } from '../parseHeader';

describe('parseHeader takes a binary string and...', () => {
    it('returns a object with the number of ascii, asciiExt and unicode chars', () => {
        const header = parseHeader('00110100');
        expect('asciiCount' in header).toBe(true);
        expect('asciiExtCount' in header).toBe(true);
        expect('unicodeCount' in header).toBe(true);
    });

    it('returns the key mapStart', () => {
        const header = parseHeader('00110100');
        expect('mapStart' in header).toBe(true);
    });

    test('The returned values are always 0 or positive integers', () => {
        const header = parseHeader('00100000');
        expect(header.asciiCount).toBeTypeOf('number');
        expect(header.asciiExtCount).toBeTypeOf('number');
        expect(header.unicodeCount).toBeTypeOf('number');
        expect(header.mapStart).toBeTypeOf('number');
    });
});
