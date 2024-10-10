import { errorLib } from './errorLibrary';

const compressor = (stringToCompress, compressionTable) =>
    new Promise((resolve, reject) => {
        if (!stringToCompress || !compressionTable) {
            reject(errorLib.parameterIsMissing());
        }
        if (typeof stringToCompress !== 'string') {
            reject(errorLib.dataExpected('string', stringToCompress));
        }
        if (!(compressionTable instanceof Map)) {
            reject(errorLib.dataExpected('Map', compressionTable));
        }

        let binaryString = '';

        for (const char of stringToCompress) {
            binaryString += compressionTable.get(char);
        }

        resolve(binaryString);
    });

export { compressor };
