import { arrangeChars } from './charMapToBin.js';
import { fileDir } from './fileDir.js';
import { toBin } from './toBinary.js';
import { errorLib } from './errorLibrary.js';
import { byteSize } from './units.js';

const assembler = (compressionMap, fileBinaryString) => {
    if (!compressionMap) {
        errorLib.parameterIsMissing;
    }
    if (!(compressionMap instanceof Map)) {
        errorLib.dataExpected('Map', compressionMap);
    }

    const { ascii, asciiExt, unicode } = arrangeChars(compressionMap);

    const asciiCountBin =
        ascii.length > 0 ? toBin(ascii.length, byteSize.ascii) : '';
    const asciiExtCountBin =
        asciiExt.length > 0 ? toBin(asciiExt.length, byteSize.asciiExt) : '';
    const unicodeCountBin =
        unicode.length > 0 ? toBin(unicode.length, byteSize.unicode) : '';
    const magicNumber = ['F', '4', 'R']
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
