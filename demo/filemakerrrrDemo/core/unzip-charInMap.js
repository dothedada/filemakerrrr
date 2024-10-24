import { toDecimal } from '../utils/conversion.js';
import { zippedCharMaxLength } from '../utils/units.js';
const unzipCharInMap = (map, string, charStart, charLength) => {
    const stringToGet = string.slice(charStart);
    const charCode = toDecimal(stringToGet.slice(0, charLength));
    const char = String.fromCharCode(charCode);
    const zippedLength = toDecimal(stringToGet.slice(charLength, charLength + zippedCharMaxLength));
    const charBinStart = charStart + charLength + zippedCharMaxLength;
    const charBinEnd = charBinStart + zippedLength;
    const charBin = string.slice(charBinStart, charBinEnd);
    map.set(charBin, char);
    return charBinEnd;
};
export { unzipCharInMap };
