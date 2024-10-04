import { describe, it, expect } from 'vitest';
import { nodeFactory } from '../nodeFactory';

describe('NodeFactory behaviour', () => {
    it('returns error if no parameters are passed', () => {
        expect(() => nodeFactory()).toThrowError('Must provide a parameter!');
    });

    it('throws errer when data is a map and a the key is not passed', () => {
        const newData = new Map([['a', 1]]);
        expect(() => nodeFactory(newData)).toThrowError(
            'If data is a Map, the key must be provided',
        );
    });

    it('throws error when data is a Map and dont contains the key passed', () => {
        const newData = new Map([['a', 1]]);
        expect(() => nodeFactory(newData, 'z')).toThrowError(
            'Key not found in map',
        );
    });

    it('Throws error when data is neither a Map or an object', () => {
        expect(() => nodeFactory('newData', 'z')).toThrowError(
            'the first parameter must be a Map or an object',
        );
    });

    it('Throws error when data is an object and not contains the key "count"', () => {
        const newObject = { value: 123 };
        expect(() => nodeFactory(newObject)).toThrowError(
            'The object must contain the key "count"',
        );
    });
    // it('accepts only a map and a strin, or an object with the key "count"', () => {});
});
