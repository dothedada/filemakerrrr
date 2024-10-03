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
        this.size++;
        this.#heapifyUp();

        return leaf;
    }

    get peek() {
        if (!this.characters.length) {
            return null;
        }

        return this.characters[0];
    }

    pop() {
        // return keyValue
    }

    #heapifyDown(index) {
        //
    }
    #heapifyUp(index) {
        //
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
