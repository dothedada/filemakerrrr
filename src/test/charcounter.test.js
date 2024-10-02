import { describe, it, expect } from 'vitest';
import { stringChecker } from '../charcounter.js';

describe('stringChecker only accept strings', () => {
    it('accepts strings', () => {
        expect(() => stringChecker('123')).not.toThrowError();
    });
    it('throws error if something different of string is pass as parameter', () => {
        expect(() => stringChecker(123)).toThrowError('Input must be a string');
    });
});
