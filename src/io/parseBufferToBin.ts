import { toBin } from '../utils/conversion.js';
import { runtimeErr } from '../utils/errors.js';

const parseBufferToBin = (fileArray: Uint8Array): Promise<string> => {
    return new Promise((resolve, reject) => {
        let stringBin = '';

        for (let i = 0; i < fileArray.length - 1; i++) {
            stringBin += toBin(fileArray[i], 8);
        }

        if (fileArray[fileArray.length - 1] > 0) {
            const trim = 8 - fileArray[fileArray.length - 1];
            stringBin = stringBin.slice(0, -trim);
        }

        if (!stringBin.length) {
            reject(new Error(runtimeErr.buffToBin));
        }

        resolve(stringBin);
    });
};

export { parseBufferToBin };
