import { Filemakerrrr } from '../src/filemakerrrr.js';

const zipper = new Filemakerrrr();

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
        .then(() => zipper.downloadUnzip('aslio'));
});
