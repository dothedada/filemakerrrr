import { describe, it, expect, beforeEach } from 'vitest';
import { treeMaker } from '../treeMaker';
import { Heap } from '../minHeap';

const heap = new Heap();
const testChars = new Map([
    ['a', 1],
    ['b', 6],
    ['c', 2],
    ['d', 9],
    ['e', 12],
    ['f', 5],
]);
const heapSmall = new Heap();
const testCharsSmall = new Map([
    ['a', 1],
    ['b', 6],
    ['c', 2],
    ['d', 4],
]);

const iterator = testChars.entries();
const iteratorSmall = testCharsSmall.entries();

describe('Behaviour of the treeMaker', () => {
    it('only accepts a Heap instance', () => {
        expect(() => treeMaker()).toThrowError('A parameter is missing!');
        expect(() => treeMaker('asd')).toThrowError(
            `Expected <Heap>, instead received <${typeof 'asd'}>`,
        );
        expect(() => treeMaker({})).toThrowError(
            `Expected <Heap>, instead received <${typeof {}}>`,
        );
    });

    it('pops the objects of the heap, sum the "count", merge them and push it back', () => {
        heapSmall.push(iteratorSmall.next().value);
        heapSmall.push(iteratorSmall.next().value);
        heapSmall.push(iteratorSmall.next().value);
        heapSmall.push(iteratorSmall.next().value);
        treeMaker(heapSmall);
        expect(heapSmall.chars[0].count).toBe(13);

        heap.push(iterator.next().value);
        heap.push(iterator.next().value);
        heap.push(iterator.next().value);
        heap.push(iterator.next().value);
        heap.push(iterator.next().value);
        heap.push(iterator.next().value);
        treeMaker(heap);
        expect(heap.chars[0].count).toBe(35);
    });
});
