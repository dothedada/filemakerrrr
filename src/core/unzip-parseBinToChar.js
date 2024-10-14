import { mapBuilder } from './unzip-mapBuilder.js';
import { parseHeader } from './unzip-parseHeader.js';
import { decompressor } from './unzip-decompressor.js';
import { message } from '../utils/messages.js';

const parseBinToChar = (stringBin) => {
    const header = parseHeader(stringBin);
    const { charsMap, currentPosition } = mapBuilder(header, stringBin);
    const string = decompressor(charsMap, stringBin, currentPosition);

    return new Promise((resolve, reject) => {
        if (typeof string !== 'string' && !string.length) {
            reject(new Error(message.runtimeErr.binToChar));
        }

        resolve(string);
    });
};

export { parseBinToChar };
