import { byteSize } from './units.js';
import { byesForCharInZipMap } from './units.js';

const zipForecast = (stringLength, charCount, charsUnicode = 0) => {
    const stringInBits = stringLength * byteSize.asciiExt;
    const compressedCharMaxBits = Math.ceil(Math.log2(charCount));
    const compressedCharTable =
        charCount * byesForCharInZipMap * byteSize.asciiExt +
        charsUnicode * byteSize.asciiExt;
    const compressedStringInBits = compressedCharMaxBits * stringLength;

    const rate = (compressedCharTable + compressedStringInBits) / stringInBits;
    const should = rate <= 1;

    return { should, rate };
};

export { zipForecast };
