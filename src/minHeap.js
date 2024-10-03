class Heap {
    constructor() {
        this.chars = [];
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

        this.chars[this.size] = leaf;
        this.#heapifyUp(this.size);
        this.size++;

        return leaf;
    }

    get peek() {
        if (!this.size) {
            return null;
        }

        return this.chars[0];
    }

    pop() {
        if (!this.size) {
            return null;
        }

        this.size--;
        const topOfTheHeap = this.chars[0];

        if (!this.size) {
            this.chars = [];
        } else {
            this.chars[0] = this.chars[this.size];
        }

        this.chars.length = this.size;

        this.#heapifyDown();

        return topOfTheHeap;
    }

    #heapifyDown(index = 0) {
        const leftInd = this.#childLeftIndex(index);
        const rightInd = this.#childRightIndex(index);

        let smallInd = index;

        if (
            this.chars[leftInd] &&
            this.chars[leftInd].count < this.chars[smallInd].count
        ) {
            smallInd = leftInd;
        }

        if (
            this.chars[rightInd] &&
            this.chars[rightInd].count < this.chars[smallInd].count
        ) {
            smallInd = rightInd;
        }

        if (smallInd !== index) {
            const thisNode = this.chars[index];
            const smallerNode = this.chars[smallInd];

            [this.chars[index], this.chars[smallInd]] = [smallerNode, thisNode];
            this.#heapifyDown(smallInd);
        }
        // if (leftIndex >= this.size) {
        //     return;
        // }
        //
        // if (this.size === 2 && this.chars[1].count < thisNode.count) {
        //     [this.chars[0], this.chars[1]] = [this.chars[1], thisNode];
        //     return;
        // }
        //
        // const nodeLeft = this.chars[leftIndex];
        // const nodeRight = this.chars[rightIndex];
        //
        // if (
        //     nodeLeft.count <= nodeRight.count &&
        //     nodeLeft.count < thisNode.count
        // ) {
        //     this.chars[index] = nodeLeft;
        //     this.chars[leftIndex] = thisNode;
        //
        //     this.#heapifyDown(leftIndex);
        // }
        //
        // if (
        //     nodeLeft.count > nodeRight.count &&
        //     nodeRight.count < thisNode.count
        // ) {
        //     this.chars[index] = nodeRight;
        //     this.chars[rightIndex] = thisNode;
        //
        //     this.#heapifyDown(rightIndex);
        // }
    }

    #heapifyUp(index) {
        if (index === 0) {
            return;
        }

        const thisParentIndex = this.#parent(index);
        const thisNode = this.chars[index];
        const thisNodeParent = this.chars[thisParentIndex];

        if (thisNode.count < thisNodeParent.count) {
            this.chars[thisParentIndex] = thisNode;
            this.chars[index] = thisNodeParent;

            this.#heapifyUp(thisParentIndex);
        }
    }

    #parent(index) {
        return Math.ceil((index - 1) / 2);
    }

    #childLeftIndex(index) {
        return index * 2 + 1;
    }

    #childRightIndex(index) {
        return index * 2 + 2;
    }
}

export { Heap };
