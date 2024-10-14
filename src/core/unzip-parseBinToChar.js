import { mapBuilder } from './unzip-mapBuilder.js';
import { parseHeader } from './unzip-parseHeader.js';
import { decompressor } from './unzip-decompressor.js';

const parseBinToChar = (stringBin) => {
    const header = parseHeader(stringBin);
    const { charsMap, currentPosition } = mapBuilder(header, stringBin);
    const string = decompressor(charsMap, stringBin, currentPosition);

    return new Promise((resolve, reject) => {
        if (typeof string !== 'string' && !string.length) {
            reject(new Error('An error ocur while unzipping the string'));
        }

        resolve(string);
    });
};

export { parseBinToChar };
