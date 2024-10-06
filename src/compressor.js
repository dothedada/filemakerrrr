import { errorLib } from './errorLibrary';

const compressor = (stringToCompress, compressionTable) => {
    if (!stringToCompress || !compressionTable) {
        errorLib.parameterIsMissing();
    }
    if (typeof stringToCompress !== 'string') {
        errorLib.dataExpected('string', stringToCompress);
    }
    if (!(compressionTable.zip instanceof Map)) {
        errorLib.dataExpected('Map', compressionTable);
    }

    let binaryString = '';

    for (const char of stringToCompress) {
        binaryString += compressionTable.zip.get(char);
    }

    return binaryString;
};

export { compressor };
