const fileDownload = (name, binaryBuffer) => {
    const blob = new Blob([binaryBuffer], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);

    const downloadLink = document.createElement('a');
    downloadLink.download = `${name}.f4r.bin`;
    downloadLink.href = url;
    downloadLink.click();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
};
