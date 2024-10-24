import { runtimeErr } from '../utils/errors.js';

const fileLoader = (file: File): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            if (!e.target) {
                return;
            }
            resolve(e.target.result as ArrayBuffer);
        };
        reader.onerror = () => reject(new Error(runtimeErr.onUpload));
        reader.readAsArrayBuffer(file);
    });
};

export { fileLoader };
