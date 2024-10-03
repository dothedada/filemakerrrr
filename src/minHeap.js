class Heap {
    constructor() {
        this.characters = [];
        this.size = 0;
    }

    push(map, key) {
        if (!map || !key) {
            throw new Error('Provide all parameters!');
        }
        if (!(map instanceof Map)) {
            throw new Error('The first parameter must be a map!');
        }
        if (!map.has(key)) {
            throw new Error('Key not found in map');
        }

        const leaf = { character: key, count: map.get(key) };

        this.characters[this.size] = leaf;
        this.#heapifyUp(this.size);
        this.size++;

        return leaf;
    }

    get peek() {
        if (!this.size) {
            return null;
        }

        return this.characters[0];
    }

    pop() {
        if (!this.size) {
            return null;
        }

        this.size--;

        const topOfTheHeap = this.characters[0];
        this.characters[0] = this.characters[this.size];

        this.characters.length = this.size;

        return topOfTheHeap;
    }

    #heapifyDown(index) {
        //
    }

    #heapifyUp(index) {
        //
    }

    #parent(index) {
        return Math.ceil((index - 1) / 2);
    }

    #childLeft(index) {
        return index * 2 + 1;
    }

    #childRight(index) {
        return index * 2 + 2;
    }
}

export { Heap };
// injectMap(charactersMap = undefined) {
//     if (!charactersMap) {
//         throw new Error('Provide a parameter!');
//     }
//     if (!(charactersMap instanceof Map)) {
//         throw new Error('The parameter must be a Map');
//     }
//
//     charactersMap.forEach(this.push);
//
//     return this;
// }
// crea el minHeap
