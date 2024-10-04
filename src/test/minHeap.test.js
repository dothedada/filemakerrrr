import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Heap } from '../minHeap';

let heap;
let mapIterator;
const charactersMap = new Map([
    ['a', 1],
    ['b', 5],
    ['c', 3],
    ['d', 2],
    ['e', 4],
    ['f', 3],
    ['g', 4],
    ['h', 3],
]);

beforeEach(() => {
    heap = new Heap();
    mapIterator = charactersMap.entries();
});

describe('Heap basic structure', () => {
    it('stores the characters in a Array', () => {
        expect('chars' in heap).toBe(true);
        expect(Array.isArray(heap.chars)).toBe(true);
    });

    it('starts with a size of 0', () => {
        expect(heap.size).toBe(0);
    });
});
describe('Heap methods: push', () => {
    it('has a mehod called push', () => {
        expect('push' in heap).toBe(true);
    });

    it('adds 1 to the size each time push is invoked', () => {
        expect(heap.size).toBe(0);
        heap.push(mapIterator.next().value);
        expect(heap.size).toBe(1);
        heap.push(mapIterator.next().value);
        heap.push(mapIterator.next().value);
        heap.push(mapIterator.next().value);
        expect(heap.size).toBe(4);
    });

    it('transforms the parameters to an object, adds it to the end of the heap and returns it', () => {
        expect(heap.size).toBe(0);
        expect(heap.chars.length).toBe(0);

        expect(heap.push(mapIterator.next().value)).toStrictEqual({
            character: 'a',
            count: 1,
        });
        expect(heap.size).toBe(1);
        expect(heap.chars.length).toBe(1);

        expect(heap.push(mapIterator.next().value)).toStrictEqual({
            character: 'b',
            count: 5,
        });

        expect(heap.size).toBe(2);
        expect(heap.chars.length).toBe(2);

        expect(heap.chars[0]).toStrictEqual({
            character: 'a',
            count: 1,
        });
    });
});

describe('Heap methods: pop', () => {
    it('has a method called pop', () => {
        expect('pop' in heap).toBe(true);
    });

    it('returns the top of the heap', () => {
        heap.push(mapIterator.next().value);
        heap.push(mapIterator.next().value);
        heap.push(mapIterator.next().value);
        heap.push(mapIterator.next().value);
        expect(heap.pop()).toStrictEqual({
            character: 'a',
            count: 1,
        });
    });

    it('decrease the size of the heap every time it is invoked', () => {
        heap.push(mapIterator.next().value);
        heap.push(mapIterator.next().value);

        expect(heap.size).toBe(2);
        heap.pop();
        expect(heap.size).toBe(1);
        heap.pop();
        expect(heap.size).toBe(0);
    });

    it('return null if the heap is empty', () => {
        expect(heap.pop()).toBeNull();
    });

    it('removes the top element of the heap', () => {
        heap.push(mapIterator.next().value);
        heap.push(mapIterator.next().value);
        heap.push(mapIterator.next().value);
        heap.push(mapIterator.next().value);

        let heapTop = heap.pop();
        expect(heapTop !== heap.chars[0]).toBe(true);
        heapTop = heap.pop();
        expect(heapTop !== heap.chars[0]).toBe(true);
        heapTop = heap.pop();
        expect(heapTop !== heap.chars[0]).toBe(true);
        heapTop = heap.pop();
        expect(heapTop !== heap.chars[0]).toBe(true);
    });
});

describe('Behavior of the heap', () => {
    it('keeps the object with the lowest count on top when pushing', () => {
        heap.push(mapIterator.next().value);
        heap.push(mapIterator.next().value);
        heap.push(mapIterator.next().value);
        expect(heap.chars[0]).toStrictEqual({
            character: 'a',
            count: 1,
        });

        heap.push(mapIterator.next().value);
        heap.push(mapIterator.next().value);
        heap.push(mapIterator.next().value);
        expect(heap.chars[0]).toStrictEqual({
            character: 'a',
            count: 1,
        });
    });

    // ['a', 1],
    // ['b', 5],
    // ['c', 3],
    // ['d', 2],
    // ['e', 4],
    // ['f', 3],
    // ['g', 4],
    // ['h', 3],
    it('keeps the object with the lowest count on top when poping', () => {
        heap.push(mapIterator.next().value);
        heap.push(mapIterator.next().value);
        heap.push(mapIterator.next().value);
        heap.push(mapIterator.next().value);
        heap.push(mapIterator.next().value);
        heap.push(mapIterator.next().value);
        heap.push(mapIterator.next().value);
        heap.push(mapIterator.next().value);

        expect(heap.chars[0]).toStrictEqual({ character: 'a', count: 1 });
        heap.pop();
        expect(heap.chars[0]).toStrictEqual({ character: 'd', count: 2 });
        heap.pop();
        heap.pop();
        heap.pop();
        expect(heap.chars[0].count).toBe(3);
        heap.pop();
        expect(heap.chars[0].count).toBe(4);
        heap.pop();
        expect(heap.chars[0].count).toBe(4);
    });
});
