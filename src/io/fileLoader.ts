import { runtimeErr } from '../utils/errors.js';

const fileLoader = (
    file: File,
): Promise<ArrayBuffer | string | null | Error> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target) {
                resolve(e.target.result);
            }
        };
        reader.onerror = () => reject(new Error(runtimeErr.onUpload));
        reader.readAsArrayBuffer(file);
    });
};

export { fileLoader };
