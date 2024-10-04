import { errorLib } from './errorLibrary';

const bits = 8;

const compressionForecast = (stringLength, charCount) => {
    if (!stringLength || !charCount) {
        errorLib.parameterIsMissing();
    }

    const stringInBits = stringLength * bits;
    const charMaxBits = Math.ceil(Math.log2(charCount));
    const charTable = charMaxBits * charCount + charCount * bits;
    const compressedStringInBits = charMaxBits * stringLength;

    const rate = (charTable + compressedStringInBits) / stringInBits;
    const should = rate <= 1;

    return { should, rate };
};

export { compressionForecast };
