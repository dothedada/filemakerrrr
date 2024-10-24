import { toDecimal } from '../utils/conversion.js';
const parseHeader = (binaryString) => {
    const zipStructure = binaryString.slice(0, 8);
    const header = {
        version: Number.parseInt(zipStructure.slice(0, 3), 10),
        isZipped: Boolean(+zipStructure[3]),
        fixedZip: Boolean(+zipStructure[4]),
        hasAscii: Boolean(+zipStructure[5]),
        hasAsciiExt: Boolean(+zipStructure[6]),
        hasUnicode: Boolean(+zipStructure[7]),
    };
    const asciiStart = 8;
    const asciiCount = header.hasAscii
        ? toDecimal(binaryString.slice(asciiStart, asciiStart + 7))
        : 0;
    const asciiExtStart = asciiStart + (header.hasAscii ? 7 : 0);
    const asciiExtCount = header.hasAsciiExt
        ? toDecimal(binaryString.slice(asciiExtStart, asciiExtStart + 8))
        : 0;
    const unicodeStart = asciiExtStart + (header.hasAsciiExt ? 8 : 0);
    const unicodeCount = header.hasUnicode
        ? toDecimal(binaryString.slice(unicodeStart, unicodeStart + 16))
        : 0;
    const mapStart = unicodeStart + (header.hasUnicode ? 16 : 0);
    return { asciiCount, asciiExtCount, unicodeCount, mapStart };
};
export { parseHeader };
