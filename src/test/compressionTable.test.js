import { describe, it, expect } from 'vitest';
import { compressionTable } from '../compressionTable';
import { Heap } from '../minHeap';
import { treeMaker } from '../treeMaker';

const heap = new Heap();
const testChars = new Map([
    [' ', 1],
    ['b', 6],
    ['\n', 2],
    ['d', 9],
    ['e', 12],
    ['f', 5],
]);
const iterator = testChars.entries();

describe('Compression table generator', () => {
    it('throws error if no parameters are passed', () => {
        expect(() => compressionTable()).toThrowError('A parameter is missing');
    });

    it('returns a map with the chars as keys', () => {
        heap.push(iterator.next().value);
        heap.push(iterator.next().value);
        heap.push(iterator.next().value);
        heap.push(iterator.next().value);
        heap.push(iterator.next().value);
        heap.push(iterator.next().value);
        treeMaker(heap);

        expect(typeof compressionTable(heap.chars[0])).toBe('object');
        expect(compressionTable(heap.chars[0]) instanceof Map).toBe(true);
        expect(compressionTable(heap.chars[0]).has(' ')).toBe(true);
        expect(compressionTable(heap.chars[0]).has('b')).toBe(true);
        expect(compressionTable(heap.chars[0]).has('\n')).toBe(true);
    });
});
