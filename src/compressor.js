const compressor = (stringToCompress, compressionTable) =>
    new Promise((resolve, reject) => {
        let binaryString = '';

        for (const char of stringToCompress) {
            binaryString += compressionTable.get(char);
        }

        if (typeof binaryString !== 'string' || !binaryString.length) {
            reject(new Error('The string cannot be compressed'));
        }
        resolve(binaryString);
    });

export { compressor };
