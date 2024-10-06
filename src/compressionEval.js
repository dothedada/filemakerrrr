import { errorLib } from './errorLibrary';

const byteSize = 8;
const byesForChar = 3; // 1 ascii, 1 comressed length, 1 compressed string

const compressionForecast = (stringLength, charCount, charsUnicode = 0) => {
    if (!stringLength || !charCount) {
        errorLib.parameterIsMissing();
    }

    const stringInBits = stringLength * byteSize;
    const compressedCharMaxBits = Math.ceil(Math.log2(charCount));
    const compressedCharTable =
        charCount * byesForChar * byteSize + charsUnicode * byteSize;
    const compressedStringInBits = compressedCharMaxBits * stringLength;

    const rate = (compressedCharTable + compressedStringInBits) / stringInBits;
    const should = rate <= 1;

    return { should, rate };
};

export { compressionForecast };
