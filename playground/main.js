import { Filemakerrrr } from '../index.js';

document.querySelectorAll('button').forEach((buton) => {
    buton.disabled = true;
});
const zipBtn = document.querySelector('#zipBtn');
const unzipBtn = document.querySelector('#unzipBtn');
const downZipBtn = document.querySelector('#downloadZipBtn');
const downUnzipBtn = document.querySelector('#downloadUnzipBtn');

const zipTxt = document.querySelector('textarea');
const unzipFile = document.querySelector('[type="file"]');

const zipStats = document.querySelector('.zip .stats');
const unzipStats = document.querySelector('.unzip .stats');

const zipper = new Filemakerrrr();
zipBtn.addEventListener('click', () => {
    zipper.stringToZip(zipTxt.value).zip();
    downZipBtn.disabled = false;
    console.log('zip');
});
unzipBtn.addEventListener('click', () => {
    console.log('unzip');
});
downZipBtn.addEventListener('click', () => {
    zipper.downloadZip('testealo-zip');
    console.log('download Zip');
});
downUnzipBtn.addEventListener('click', () => {
    console.log('download Unzip');
});

if (zipTxt.value.length) {
    zipBtn.disabled = false;
}

zipTxt.addEventListener('input', (e) => {
    const txt = e.target.value;
    if (txt.length) {
        zipBtn.disabled = false;
    } else {
        zipBtn.disabled = true;
    }
});

// const btn = document.querySelector('.getTXT');
// const textToZip = document.querySelector('textarea');
// btn.addEventListener('pointerdown', () => {
//     zipper
//         .stringToZip(textToZip.value)
//         .zip()
//         .then(() => zipper.downloadZip('carajo'));
// });
// document.querySelector('.fileInput').addEventListener('change', (event) => {
//     zipper
//         .parseFile(event.target.files[0])
//         .then(() => zipper.unzip())
//         .then(() => zipper.downloadUnzip('descargado descomprimido'));
// });
