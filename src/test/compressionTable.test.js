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

    it('returns an object whith two maps as values, compression and decompression', () => {
        expect(typeof compressionTable(heap)).toBe('object');
        expect('compression' in compressionTable(heap)).toBe(true);
        expect('decompression' in compressionTable(heap)).toBe(true);
        expect(compressionTable(heap).compression instanceof Map).toBe(true);
        expect(compressionTable(heap).decompression instanceof Map).toBe(true);
    });

    it('map with the binary route as key and char as value', () => {
        heap.push(iterator.next().value);
        heap.push(iterator.next().value);
        heap.push(iterator.next().value);
        heap.push(iterator.next().value);
        heap.push(iterator.next().value);
        heap.push(iterator.next().value);
        treeMaker(heap);

        expect(compressionTable(heap).compression.has('b')).toBe(true);
        expect(compressionTable(heap).compression.get('d')).toBe('10');
        expect(compressionTable(heap).compression.has(' ')).toBe(true);
        expect(compressionTable(heap).compression.get('\n')).toBe('0101');

        expect(compressionTable(heap).decompression.has('00')).toBe(true);
        expect(compressionTable(heap).decompression.get('0100') === ' ').toBe(
            true,
        );
        expect(compressionTable(heap).decompression.has('10')).toBe(true);
        expect(compressionTable(heap).decompression.get('0101') === '\n').toBe(
            true,
        );
    });
});
