import { toDecimal } from './toBinary.js';
import { byteSize } from './units.js';

const pushCharInMap = (map, string, charStart, charLength) => {
    const stringToGet = string.slice(charStart);

    const char = String.fromCharCode(
        toDecimal(stringToGet.slice(0, charLength)),
    );
    const zippedLength = toDecimal(
        stringToGet.slice(charLength, charLength + 4),
    );
    const charBin = string.slice(charStart + charLength + 4, zippedLength);

    map.set(charBin, char);

    const charEnd = charStart + charLength + zippedLength + 4;
    console.log(char);

    return charEnd;
};

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
            currentPosition = pushCharInMap(
                charsMap,
                binaryString,
                currentPosition,
                size,
            );
        }
    }

    console.log(charsMap, currentPosition);
};

export { mapBuilder };
