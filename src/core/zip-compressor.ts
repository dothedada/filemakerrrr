import { runtimeErr } from '../utils/errors.js';
import type { ZipMapBin } from './types.js';

const compressor = (
    stringToCompress: string,
    compressionTable: ZipMapBin,
): Promise<string> =>
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
