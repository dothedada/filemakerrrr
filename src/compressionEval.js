import { errorLib } from './errorLibrary.js';
import { byteSize } from './units.js';

const byesForChar = 3; // 1 ascii, 1 comressed length, 1 compressed string

const zipForecast = (stringLength, charCount, charsUnicode = 0) => {
    if (!stringLength || !charCount) {
        errorLib.parameterIsMissing();
    }

    const stringInBits = stringLength * byteSize.asciiExt;
    const compressedCharMaxBits = Math.ceil(Math.log2(charCount));
    const compressedCharTable =
        charCount * byesForChar * byteSize.asciiExt +
        charsUnicode * byteSize.asciiExt;
    const compressedStringInBits = compressedCharMaxBits * stringLength;

    const rate = (compressedCharTable + compressedStringInBits) / stringInBits;
    const should = rate <= 1;

    return { should, rate };
};

export { zipForecast };
