import { Filemakerrrr } from '../index.js';

document.querySelectorAll('button').forEach((btn) => {
    btn.disabled = true;
});

const zipBtn = document.querySelector('#zipBtn');
const unzipBtn = document.querySelector('#unzipBtn');
const downZipBtn = document.querySelector('#downloadZipBtn');
const downUnzipBtn = document.querySelector('#downloadUnzipBtn');

const zipTxt = document.querySelector('textarea');
const zipFile = document.querySelector('.fileZip');
const unzipFile = document.querySelector('.fileUnzip');
const unzipPreview = document.querySelector('.preview');

const zipStats = document.querySelector('.zip .stats');
const unzipStats = document.querySelector('.unzip .stats');

const zipper = new Filemakerrrr();
zipper.talkToMe();
zipBtn.addEventListener('click', async () => {
    try {
        zipper.stringToZip(zipTxt.value);
        await zipper.zip();

        const stats = zipper.zipStats;
        zipStats.innerHTML = `
<div>Extensión del texto: ${stats.textLength} caracteres</div>
<div>Letras y caracteres en el texto: ${stats.chars}</div>
<div>Bytes antes de comprimir: ${stats.bytesStart}</div>
<div>Compresion estimada: ${stats.zipRateEst.toFixed(4)}</div>
<div>---<div/>
<div>${!stats.zipped ? 'El archivo no fue comprimido' : ''}</div>
<div>Tiempo transcurrido: ${stats.timeEnd - stats.timeStart} milisegundos</div>
<div>Bytes luego de comprimir: ${stats.bytesEnd}</div>
<div>Compresion real: ${stats.zipRateReal.toFixed(4)}</div>
`;
        downZipBtn.disabled = false;
    } catch (err) {
        zipStats.textContent = 'Ocurrio un error durante la compresión';
    }
});

downZipBtn.addEventListener('click', () => {
    zipper.download('zipDePrueba');
});

zipFile.addEventListener('change', (e) => {
    if (!e.target.files[0]) {
        return;
    }
    console.log(e.target.files[0]);
});
unzipFile.addEventListener('change', (e) => {
    if (!e.target.files[0]) {
        return;
    }
    unzipBtn.disabled = false;
});
unzipBtn.addEventListener('click', async () => {
    await zipper.parseFile(unzipFile.files[0]);
    await zipper.unzip();
    unzipPreview.textContent = zipper.output;

    const stats = zipper.zipStats;

    console.log(stats);
    unzipStats.innerHTML = `
<div>Extensión del texto: ${stats.textLength} caracteres</div>
<div>Bytes antes de descomprimir: ${stats.bytesStart}</div>
<div>---<div/>
<div>${!stats.zipped ? 'El archivo no fue comprimido' : ''}</div>
<div>Tiempo transcurrido: ${stats.timeEnd - stats.timeStart} milisegundos</div>
<div>Bytes luego de descomprimir: ${stats.bytesEnd}</div>
`;
    downUnzipBtn.disabled = false;
});
downUnzipBtn.addEventListener('click', () => {
    zipper.download();
});

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
