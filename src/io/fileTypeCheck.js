import { signature } from '../utils/units.js';

const fileCheck = (file) => {
    const fileArray = new Uint8Array(file);

    const isf4r = fileArray
        .slice(0, 3)
        .every((byte, index) => String.fromCharCode(byte) === signature[index]);
    if (!isf4r) {
        return null;
    }

    return fileArray.slice(3);
};

export { fileCheck };
