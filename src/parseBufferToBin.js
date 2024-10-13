import { toBin } from './toBinary.js';

const parseBufferToBin = (fileArray) => {
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
            reject(new Error('An error ocur while parsing the binary'));
        }

        resolve(stringBin);
    });
};

export { parseBufferToBin };
