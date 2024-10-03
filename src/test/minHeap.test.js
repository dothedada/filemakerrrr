import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Heap } from '../minHeap';

let heap;
const charactersMap = new Map([
    ['a', 1],
    ['b', 5],
    ['c', 3],
    ['d', 2],
]);

beforeEach(() => {
    heap = new Heap();
});

describe('Heap basic structure', () => {
    it('is an instance of Heap', () => {
        expect(heap instanceof Heap).toBe(true);
    });

    it('stores the characters in a Array', () => {
        expect('characters' in heap).toBe(true);
        expect(Array.isArray(heap.characters)).toBe(true);
    });

    it('starts with a size of 0', () => {
        expect(heap.size).toBe(0);
    });
});

describe('Heap methods: push', () => {
    it('has a mehod called push', () => {
        expect('push' in heap).toBe(true);
    });

    it('only accepts as parameters a map and a key', () => {
        expect(() => heap.push()).toThrowError('Provide all parameters!');
        expect(() => heap.push('not a map', 'a')).toThrowError(
            'The first parameter must be a map!',
        );
        expect(() => heap.push(charactersMap, 'x')).toThrowError(
            'Key not found in map',
        );
    });

    it('adds 1 to the size each time push is invoked', () => {
        expect(heap.size).toBe(0);
        heap.push(charactersMap, 'a');
        expect(heap.size).toBe(1);
        heap.push(charactersMap, 'a');
        heap.push(charactersMap, 'a');
        heap.push(charactersMap, 'a');
        expect(heap.size).toBe(4);
    });

    it('transforms the parameters to an object, adds it to the end of the heap and returns it', () => {
        expect(heap.size).toBe(0);
        expect(heap.characters.length).toBe(0);

        heap.push(charactersMap, 'a');
        expect(heap.size).toBe(1);
        expect(heap.characters.length).toBe(1);

        expect(heap.push(charactersMap, 'b')).toStrictEqual({
            character: 'b',
            count: 5,
        });

        expect(heap.size).toBe(2);
        expect(heap.characters.length).toBe(2);

        expect(heap.characters[0]).toStrictEqual({
            character: 'a',
            count: 1,
        });
    });
});

describe('Heap methods: peek', () => {
    it('has a method called peek', () => {
        expect('peek' in heap).toBe(true);
    });

    it('returns null if the heap is empty', () => {
        expect(heap.peek).toBeNull();
    });

    it('returns what is on the top of the heap', () => {
        heap.push(charactersMap, 'a');
        expect(heap.peek).toStrictEqual({
            character: 'a',
            count: 1,
        });
    });

    it('is a getter that does not alter anithyng on the heap', () => {
        heap.push(charactersMap, 'a');
        heap.push(charactersMap, 'b');
        heap.push(charactersMap, 'c');
        heap.push(charactersMap, 'd');

        const startingHeapSize = heap.size;
        const startingCharactes = [...heap.characters];

        heap.peek;
        heap.peek;
        heap.peek;

        expect(heap.size).toBe(startingHeapSize);
        expect(heap.characters).toStrictEqual(startingCharactes);
    });
});

describe('Heap methods: pop', () => {
    it('has a method called pop', () => {
        expect('pop' in heap).toBe(true);
    });

    it('returns the top of the heap', () => {
        heap.push(charactersMap, 'a');
        heap.push(charactersMap, 'b');
        heap.push(charactersMap, 'c');
        heap.push(charactersMap, 'd');
        expect(heap.pop()).toStrictEqual({
            character: 'a',
            count: 1,
        });
    });

    it('decrease the size of the heap every time it is invoked', () => {
        heap.push(charactersMap, 'a');
        heap.push(charactersMap, 'b');

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
        heap.push(charactersMap, 'a');
        heap.push(charactersMap, 'b');
        heap.push(charactersMap, 'c');
        heap.push(charactersMap, 'd');

        let heapTop = heap.pop();
        expect(heapTop !== heap.characters[0]).toBe(true);
        heapTop = heap.pop();
        expect(heapTop !== heap.characters[0]).toBe(true);
        heapTop = heap.pop();
        expect(heapTop !== heap.characters[0]).toBe(true);
        heapTop = heap.pop();
        expect(heapTop !== heap.characters[0]).toBe(true);
    });
});

// it('has a method, injectData, that only takes a map and a number', () => {
//     expect('injectMap' in heap).toBe(true);
//     expect(() => heap.injectMap()).toThrowError('Provide a parameter!');
//     expect(() => heap.injectMap({})).toThrowError(
//         'The parameter must be a Map',
//     );
// });
