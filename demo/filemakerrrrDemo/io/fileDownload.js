import { fileExt } from '../utils/units.js';
const fileDownload = (name, binaryBuffer, zip) => {
    const blob = new Blob([binaryBuffer], {
        type: zip ? 'application/octet-stream' : 'text/plain',
    });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.download = `${name}${zip ? fileExt.zipped : fileExt.plain}`;
    downloadLink.href = url;
    downloadLink.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
};
export { fileDownload };
