import { signature } from './units.js';
import { message } from './messages.js';

const fileCheck = (file, listener, lang) => {
    const fileArray = new Uint8Array(file);

    const isf4r = fileArray
        .slice(0, 3)
        .every((byte, index) => String.fromCharCode(byte) === signature[index]);
    if (!isf4r) {
        listener(message[lang].err.fileFormat);
        return null;
    }

    return fileArray.slice(3);
};

export { fileCheck };
