import { Filemakerrrr } from '../src/filemakerrrr.js';

const zipper = new Filemakerrrr();
const testString = `The toFixed()`;

const autoZipper = new Filemakerrrr(testString, {
    verbose: false,
    alwaysZip: true,
});
const btn2 = document.createElement('button');
btn2.textContent = 'descarga del compresor automatico';
btn2.addEventListener('click', () => {
    autoZipper.downloadZip('jejejejeje');
});
document.body.append(btn2);

const btn = document.querySelector('.getTXT');
const textToZip = document.querySelector('textarea');
btn.addEventListener('pointerdown', () => {
    zipper
        .stringToZip(textToZip.value)
        .zip()
        .then(() => zipper.downloadZip('carajo'));
});
document.querySelector('.fileInput').addEventListener('change', (event) => {
    zipper
        .parseFile(event.target.files[0])
        .then(() => zipper.unzip())
        .then(() => zipper.downloadUnzip('descargado descomprimido'));
});
const btn3 = document.createElement('button');
btn3.textContent = 'descarga del descomprimido';
btn3.addEventListener('click', () => {
    zipper.downloadUnzip('archivoDescomprimido');
});
document.body.append(btn3);
const unzipOutput = document.createElement('textarea');
