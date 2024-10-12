import { Filemakerrrr } from '../src/filemakerrrr.js';

const zipper = new Filemakerrrr();

const btn = document.querySelector('.getTXT');
const textToZip = document.querySelector('textarea');
btn.addEventListener('pointerdown', () => {
    zipper
        .stringToZip(textToZip.value)
        .zipIt()
        .then(() => zipper.download('carajo'));
});

document.querySelector('.fileInput').addEventListener('change', (event) => {
    zipper.parseFile(event.target.files[0]);
});
