import type { UnzipMap } from './types';

const decompressor = (
    charMap: UnzipMap,
    binaryString: string,
    startingChar: number,
): string => {
    let decompressedString = '';
    let buffer = '';
    let pointer = startingChar;

    while (pointer <= binaryString.length) {
        const currentBit = binaryString[pointer];
        buffer += currentBit;

        if (charMap.has(buffer)) {
            decompressedString += charMap.get(buffer);
            buffer = '';
        }

        pointer++;
    }

    return decompressedString;
};

export { decompressor };
