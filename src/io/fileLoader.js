import { message } from '../utils/messages.js';

const fileLoader = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = () => reject(new Error(message.runtimeErr.onUpload));
        reader.readAsArrayBuffer(file);
    });
};

export { fileLoader };
