import { fileExt, signature } from '../utils/units.js';
const fileCheck = (file) => {
    const fileArray = new Uint8Array(file);
    return new Promise((resolve) => {
        const isf4r = fileArray
            .slice(0, 3)
            .every((byte, index) => String.fromCharCode(byte) === signature[index]);
        if (isf4r) {
            resolve([fileArray.slice(3), fileExt.zipped]);
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
        const isTxt = nullCount === 0 || nonPrintable / sample <= 0.1;
        if (isTxt) {
            const decoder = new TextDecoder('utf-8');
            const text = decoder.decode(fileArray);
            resolve([text, fileExt.plain]);
        }
        resolve([null]);
    });
};
export { fileCheck };
