import { toDecimal } from '../utils/conversion.js';
import { zippedCharMaxLength } from '../utils/units.js';
import type { UnzipMap } from './types.js';

const unzipCharInMap = (
    map: UnzipMap,
    string: string,
    charStart: number,
    charLength: number,
): number => {
    const stringToGet = string.slice(charStart);

    const charCode = toDecimal(stringToGet.slice(0, charLength));
    const char = String.fromCharCode(charCode);

    const zippedLength = toDecimal(
        stringToGet.slice(charLength, charLength + zippedCharMaxLength),
    );

    const charBinStart = charStart + charLength + zippedCharMaxLength;
    const charBinEnd = charBinStart + zippedLength;
    const charBin = string.slice(charBinStart, charBinEnd);

    map.set(charBin, char);

    return charBinEnd;
};

export { unzipCharInMap };