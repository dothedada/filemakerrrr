import { signature } from '../utils/units.js';

const fileCheck = (file) => {
    const fileArray = new Uint8Array(file);

    return new Promise((resolve, reject) => {
        const isf4r = fileArray
            .slice(0, 3)
            .every(
                (byte, index) => String.fromCharCode(byte) === signature[index],
            );

        if (isf4r) {
            resolve({ file: fileArray.slice(3), type: '.f4r' });
        }

        const sample = Math.min(1024, fileArray.length);
        let nullCount = 0;
        let nonPrintable = 0;

        for (let i = 0; i < sample; i++) {
            if (fileArray[i] === 0) {
                nullCount++;
            }
            if (fileArray[i] < 32 && ![9, 10, 13].includes(fileArray[i])) {
                nonPrintable++;
            }
        }

        const isTxt = nullCount > 0 || nonPrintable / sample > 0.1;
        if (isTxt) {
            resolve({ file: fileArray, type: '.txt' });
        }

        resolve(null);
    });
};

export { fileCheck };