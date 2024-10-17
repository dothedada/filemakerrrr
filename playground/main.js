import { Filemakerrrr } from '../index.js';

document.querySelectorAll('button').forEach((btn) => {
    btn.disabled = true;
});

const zipBtn = document.querySelector('#zipBtn');
const unzipBtn = document.querySelector('#unzipBtn');
const downZipBtn = document.querySelector('#downloadZipBtn');
const downUnzipBtn = document.querySelector('#downloadUnzipBtn');

const uploadToZip = document.querySelector('.fileZip');
const uploadToUnzip = document.querySelector('.fileunzip');
const zipTxt = document.querySelector('textarea');
const unzipPreview = document.querySelector('.preview');

const zipStats = document.querySelector('.zip .stats');
const unzipStats = document.querySelector('.unzip .stats');

const zipper = new Filemakerrrr({ verbose: true });
uploadToZip.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    await zipper.parseFile(file);
    zipTxt.textContent = zipper.input;
});

// <!-- <div>Extensión del texto: ${stats.textLength} caracteres</div> -->
// <!-- <div>Letras y caracteres en el texto: ${stats.chars}</div> -->
// <!-- <div>Bytes antes de comprimir: ${stats.bytesStart}</div> -->
// <!-- <div>Compresion estimada: ${stats.zipRateEst.toFixed(4)}</div> -->
// <!-- <div>---<div/> -->
// <!-- <div>${!stats.zipped ? 'El archivo no fue comprimido' : ''}</div> -->
// <!-- <div>Tiempo transcurrido: ${stats.totalTimeMs} milisegundos</div> -->
// <!-- <div>Bytes luego de comprimir: ${stats.bytesEnd}</div> -->
// <!-- <div>Compresion real: ${stats.zipRateReal.toFixed(4)}</div> -->
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
