import { mapBuilder } from './unzip-mapBuilder.js';
import { parseHeader } from './unzip-parseHeader.js';
import { decompressor } from './unzip-decompressor.js';
import { runtimeErr } from '../utils/errors.js';

const parseBinToChar = (stringBin: string): Promise<string> => {
    const header = parseHeader(stringBin);
    const { charsMap, currentPosition } = mapBuilder(header, stringBin);
    const string = decompressor(charsMap, stringBin, currentPosition);

    return new Promise((resolve, reject) => {
        if (typeof string !== 'string') {
            reject(new Error(runtimeErr.binToChar));
        }

        resolve(string);
    });
};

export { parseBinToChar };
