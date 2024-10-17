import { runtimeErr } from '../utils/errors.js';

const compressor = (stringToCompress, compressionTable) =>
    new Promise((resolve, reject) => {
        let binaryString = '';

        for (const char of stringToCompress) {
            binaryString += compressionTable.get(char);
        }

        if (typeof binaryString !== 'string' || !binaryString.length) {
            reject(new Error(runtimeErr.zipString));
        }
        resolve(binaryString);
    });

export { compressor };
