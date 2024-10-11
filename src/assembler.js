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

    const asciiCountBin = toBin(ascii.length, byteSize.ascii);
    const asciiExtCountBin = toBin(asciiExt.length, byteSize.asciiExt);
    const unicodeCountBin = toBin(unicode.length, byteSize.unicode);

    return [
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

const homeSlider = document.createElement('div');

homeSlider.addEventListener('wheel', (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('le copio');
});
