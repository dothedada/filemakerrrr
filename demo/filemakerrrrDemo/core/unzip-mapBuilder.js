import { byteSize } from '../utils/units.js';
import { unzipCharInMap } from './unzip-charInMap.js';
const mapBuilder = (headerObject, binaryString) => {
    const { asciiCount, asciiExtCount, unicodeCount, mapStart } = headerObject;
    const charsMap = new Map();
    let currentPosition = mapStart;
    const standards = [
        { count: asciiCount, size: byteSize.ascii },
        { count: asciiExtCount, size: byteSize.asciiExt },
        { count: unicodeCount, size: byteSize.unicode },
    ];
    for (const { count, size } of standards) {
        for (let i = 0; i < count; i++) {
            currentPosition = unzipCharInMap(charsMap, binaryString, currentPosition, size);
        }
    }
    return { charsMap, currentPosition };
};
export { mapBuilder };
