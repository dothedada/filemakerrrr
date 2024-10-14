const fileLoader = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = () => reject(new Error('Error on upload'));
        reader.readAsArrayBuffer(file);
    });
};

export { fileLoader };
