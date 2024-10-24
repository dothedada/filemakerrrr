import { runtimeErr } from '../utils/errors.js';

const binaryBufferForBrowser = (binarySecuence: string): Promise<Uint8Array> =>
    new Promise((resolve, reject) => {
        const bytesNeeded = Math.ceil(binarySecuence.length / 8);
        const bytesArray = new Uint8Array(bytesNeeded + 1);

        bytesArray[bytesArray.length - 1] = binarySecuence.length % 8;

        for (let i = 0; i < bytesNeeded; i++) {
            let currentByte = binarySecuence.slice(8 * i, 8 * i + 8);

            if (currentByte.length < 8) {
                currentByte = currentByte.padEnd(8, '0');
            }

            bytesArray[i] = Number.parseInt(currentByte, 2);
        }
        if (!bytesArray) {
            reject(new Error(runtimeErr.bytesArr));
        }
        resolve(bytesArray);
    });

export { binaryBufferForBrowser };
