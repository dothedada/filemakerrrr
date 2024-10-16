import { byteSize, byesForCharInZipMap, signature } from '../utils/units.js';

const zipForecast = (stringLength, charCount, charsUnicode = 0) => {
    const treeHeight = Math.ceil(Math.log2(charCount));
    const head = signature.length * byteSize.asciiExt;
    const dirSize = byteSize.asciiExt;
    const mapAscii =
        charCount * (byteSize.asciiExt + byesForCharInZipMap + treeHeight);
    const overhead = charsUnicode * byteSize.asciiExt;
    const stringZip = stringLength * treeHeight;

    const zipSize =
        (head + dirSize + mapAscii + overhead + stringZip) / byteSize.asciiExt;
    const plainSize = stringLength + charsUnicode;

    const rate = zipSize / plainSize;
    const should = rate <= 1;

    return { should, rate };
};

export { zipForecast };
