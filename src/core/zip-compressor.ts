import { runtimeErr } from '../utils/errors.js';
import type { ZipMap } from './types.js';

const compressor = (
    stringToCompress: string,
    compressionTable: ZipMap,
): Promise<string | Error> =>
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
