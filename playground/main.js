import { Filemakerrrr } from '../src/filemakerrrr.js';

const zipper = new Filemakerrrr();

console.log('caraga');
const btn = document.querySelector('.getTXT');
const textToZip = document.querySelector('textarea');
btn.addEventListener('pointerdown', () => {
    zipper
        .stringToZip(textToZip.value)
        .zipIt()
        .then(() => zipper.download('carajo'));
    console.log('cliqueado');
});

document.querySelector('.fileInput').addEventListener('change', (event) => {
    zipper.parseFile(event.target.files[0]);
});
