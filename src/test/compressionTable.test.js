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

    it('throws error if the parameter is not a heap', () => {
        expect(() => compressionTable([1, 2, 3])).toThrowError(
            `Expected <Heap>, instead received <${typeof [1, 2, 3]}>`,
        );
    });

    it('returns a map with the binary route as key and char as value', () => {
        heap.push(iterator.next().value);
        heap.push(iterator.next().value);
        heap.push(iterator.next().value);
        heap.push(iterator.next().value);
        heap.push(iterator.next().value);
        heap.push(iterator.next().value);
        treeMaker(heap);

        console.log(compressionTable(heap));
        expect(compressionTable(heap) instanceof Map).toBe(true);
        expect(compressionTable(heap).has('00')).toBe(true);
        expect(compressionTable(heap).get('0100') === ' ').toBe(true);
        expect(compressionTable(heap).has('10')).toBe(true);
        expect(compressionTable(heap).get('0101') === '\n').toBe(true);
    });
});
