const decompressor = (charMap, binaryString, startingChar) => {
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
