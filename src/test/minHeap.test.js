import { describe, it, expect, beforeEach } from 'vitest';
import { Heap } from '../minHeap';

describe('Data in', () => {
    let heap;
    beforeEach(() => {
        heap = new Heap();
    });

    const charactersMap = new Map([
        ['a', 1],
        ['b', 5],
        ['c', 3],
        ['d', 2],
    ]);

    it('is instanseable', () => {
        expect(heap instanceof Heap).toBe(true);
    });

    it('stores the characters in a Array', () => {
        expect('characters' in heap).toBe(true);
        expect(Array.isArray(heap.characters)).toBe(true);
    });

    it('starts with a size of 0', () => {});

    it('has a method called push that only accepts a map and a key', () => {
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

    it('insert in characters array and returns an object {character, count} eachtime push is invoked', () => {
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

    it('has the method peek, to show what is on the top of the heap', () => {
        expect(heap.peek).toBeNull();

        heap.push(charactersMap, 'a');
        expect(heap.peek).toStrictEqual({
            character: 'a',
            count: 1,
        });
    });

    // it('has a method, injectData, that only takes a map and a number', () => {
    //     expect('injectMap' in heap).toBe(true);
    //     expect(() => heap.injectMap()).toThrowError('Provide a parameter!');
    //     expect(() => heap.injectMap({})).toThrowError(
    //         'The parameter must be a Map',
    //     );
    // });
});
