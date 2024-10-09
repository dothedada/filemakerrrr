import { describe, test, expect } from 'vitest';
import { Filemakerrrr } from '../filemakerrrr';

describe('log', () => {
    test('log', () => {
        const test = new Filemakerrrr();
        test.stringToZip('aaaabcddeeeefffffffffffffghijkkkkk').zipIt();
        expect(true).toBe(true);
    });
});
