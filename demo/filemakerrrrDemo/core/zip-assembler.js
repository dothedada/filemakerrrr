import { arrangeChars } from './zip-charMapToBin.js';
import { fileDir } from './zip-fileDir.js';
import { toBin } from '../utils/conversion.js';
import { byteSize, signature } from '../utils/units.js';
const assembler = (compressionMap, fileBinaryString) => {
    const { ascii, asciiExt, unicode } = arrangeChars(compressionMap);
    const asciiCountBin = ascii.length > 0 ? toBin(ascii.length, byteSize.ascii) : '';
    const asciiExtCountBin = asciiExt.length > 0 ? toBin(asciiExt.length, byteSize.asciiExt) : '';
    const unicodeCountBin = unicode.length > 0 ? toBin(unicode.length, byteSize.unicode) : '';
    const magicNumber = signature
        .map((char) => toBin(char.charCodeAt(0), 8))
        .join('');
    return [
        magicNumber,
        fileDir({ ascii, asciiExt, unicode }, false),
        asciiCountBin,
        asciiExtCountBin,
        unicodeCountBin,
        ascii.join(''),
        asciiExt.join(''),
        unicode.join(''),
        fileBinaryString,
    ].join('');
};
export { assembler };
