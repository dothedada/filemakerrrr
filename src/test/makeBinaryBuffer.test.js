import { describe, it, test, expect } from 'vitest';
import { binaryBufferForBrowser } from '../makeBinaryBuffer';

describe('filemaker Input: ', () => {
    it('Throws error if any parameter is missing', () => {
        expect(() => binaryBufferForBrowser()).toThrowError();
    });
    it('Throws error if any parameter is not a binary string', () => {
        expect(() => binaryBufferForBrowser(123)).toThrowError();
        expect(() => binaryBufferForBrowser({})).toThrowError();
        expect(() => binaryBufferForBrowser('abc')).toThrowError();
    });
});

describe('filemaker process:', () => {
    it('taket');
    console.log(binaryBufferForBrowser('1111111100000000111'));
});
