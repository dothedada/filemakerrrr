import { describe, it, expect } from 'vitest';
import { nodeFactory } from '../nodeFactory';

describe('NodeFactory behaviour', () => {
    it('returns error if no parameters are passed', () => {
        expect(() => nodeFactory()).toThrowError('A parameter is missing!');
    });

    it('thorws error when the length of the array is less than two', () => {
        const newData = ['a'];
        expect(() => nodeFactory(newData)).toThrowError(
            `The Array must have a length of 2`,
        );
    });

    it('Throws error when data is neither a Map or an object', () => {
        expect(() => nodeFactory('newData', 'z')).toThrowError(
            `Expected <Array [key,value] | Object>, instead received <${typeof 'newData'}>`,
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
