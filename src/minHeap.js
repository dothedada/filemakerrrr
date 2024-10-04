import { nodeFactory } from './nodeFactory';

class Heap {
    constructor() {
        this.chars = [];
        this.size = 0;
    }

    push(data, key) {
        const node = nodeFactory(data, key);

        this.chars[this.size] = node;
        this.#heapifyUp(this.size);
        this.size++;

        return node;
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
    }

    #heapifyUp(index) {
        if (index === 0) {
            return;
        }

        const parentInd = this.#parent(index);
        const thisNode = this.chars[index];
        const nodeParent = this.chars[parentInd];

        if (thisNode.count < nodeParent.count) {
            [this.chars[index], this.chars[parentInd]] = [nodeParent, thisNode];
            this.#heapifyUp(parentInd);
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
