import { describe, it, expect } from 'vitest';
import { nodeFactory } from '../nodeFactory';

describe('NodeFactory behaviour', () => {
    it('returns error if no parameters are passed', () => {
        expect(() => nodeFactory()).toThrowError('A parameter is missing!');
    });

    it('throws errer when data is a map and a the key is not passed or doesnt exist in the map', () => {
        const newData = new Map([['a', 1]]);
        expect(() => nodeFactory(newData)).toThrowError(
            'the key provided is not in the map',
        );
    });

    it('Throws error when data is neither a Map or an object', () => {
        expect(() => nodeFactory('newData', 'z')).toThrowError(
            `Expected <Map | Object>, instead received <${typeof 'newData'}>`,
        );
    });

    it('Throws error when data is an object and not contains the key "count"', () => {
        const newObject = { value: 123 };
        expect(() => nodeFactory(newObject)).toThrowError(
            'The object must contain the key <count>',
        );
    });

    it('Throws error when data[count] is not a number', () => {
        const newObject = { count: '123' };
        expect(() => nodeFactory(newObject)).toThrowError(
            `Expected <number>, instead received <${typeof '123'}>`,
        );
    });
});
