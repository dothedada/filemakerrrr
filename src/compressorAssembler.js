import { arrangeChars } from './charMapToBin.js';
import { fileHeader } from './fileHeader.js';
import { toBin } from './toBinary';
import { errorLib } from './errorLibrary';
import { byteSize } from './units';

const assembleHeader = (compressionMap) => {
    if (!compressionMap) {
        errorLib.parameterIsMissing;
    }
    if (!(compressionMap instanceof Map)) {
        errorLib.dataExpected('Map', compressionMap);
    }

    const { ascii, asciiExt, unicode } = arrangeChars(compressionMap);

    const asciiCountBin = toBin(ascii.length, byteSize.ascii);
    const asciiExtCountBin = toBin(asciiExt.length, byteSize.asciiExt);
    const unicodeCountBin = toBin(unicode.length, byteSize.unicode);

    return [
        fileHeader(ascii, asciiExt, unicode, false),
        asciiCountBin,
        asciiExtCountBin,
        unicodeCountBin,
        ascii.join(''),
        asciiExt.join(''),
        unicode.join(''),
    ].join('');
};

export { assembleHeader };
