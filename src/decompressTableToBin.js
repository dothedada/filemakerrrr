import { arrangeMap } from './decompressMapArrange.js';
import { fileIndex } from './decompressTableIndex.js';
import { toBin } from './toBinary';
import { errorLib } from './errorLibrary';
import { byteSize } from './units';

const decompressTableToBin = (compressionMap) => {
    if (!compressionMap) {
        errorLib.parameterIsMissing;
    }
    if (!(compressionMap instanceof Map)) {
        errorLib.dataExpected('Map', compressionMap);
    }

    const { ascii, asciiExt, unicode } = arrangeMap(compressionMap);

    const asciiCountBin = toBin(ascii.length, byteSize.ascii);
    const asciiExtCountBin = toBin(asciiExt.length, byteSize.asciiExt);
    const unicodeCountBin = toBin(unicode.length, byteSize.unicode);

    const decompressBin = [
        fileIndex(ascii.length, asciiExt.length, unicode.length),
        asciiCountBin,
        asciiExtCountBin,
        unicodeCountBin,
        ascii,
        asciiExt,
        unicode,
    ].join('');

    return { decompressBin };
};

export { decompressTableToBin };
