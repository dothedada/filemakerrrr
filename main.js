import { Filemakerrrr } from './filemakerrrrDemo/filemakerrrr.js';

document.querySelectorAll('button').forEach((btn) => {
    btn.disabled = true;
});

const zipBtn = document.querySelector('#zipBtn');
const unzipBtn = document.querySelector('#unzipBtn');
const downZipBtn = document.querySelector('#downloadZipBtn');
const downUnzipBtn = document.querySelector('#downloadUnzipBtn');
const uploadToZip = document.querySelector('.fileZip');
const uploadToUnzip = document.querySelector('.fileUnzip');
const zipTxt = document.querySelector('textarea');
const unzipPreview = document.querySelector('.preview');
const zipStats = document.querySelector('.zip .stats');
const unzipStats = document.querySelector('.unzip .stats');
const resetBtn = document.querySelector('.reset');

const zipper = new Filemakerrrr({ verbose: true });
const zipperStats = (target = undefined) => {
    zipStats.textContent = '...';
    unzipStats.textContent = '...';
    if (!target) {
        return;
    }

    const stats = zipper.viewStats;
    if (stats.action === 'zip') {
        if (!stats.zipped) {
            target.textContent = 'No need to zip.';
            return;
        }
        target.innerHTML = `<div>Unzip: ${stats.bytesStart} Bytes</div>`;
        target.innerHTML += `<div>Zip: ${stats.bytesEnd} Bytes</div>`;
        target.innerHTML += `<div>T: ${stats.totalTimeMs}ms</div>`;
        target.innerHTML += `<div>Text lenght: ${stats.textLength} chars</div>`;
        target.innerHTML += `<div>Chars used: ${stats.chars}</div>`;
        target.innerHTML += `<div>Zip forecast: ${stats.zipRateEst.toFixed(3)}</div>`;
        target.innerHTML += `<div>Real zip rate: ${stats.zipRateReal.toFixed(3)}</div>`;
    } else {
        if (stats.bytesEnd === stats.bytesStart) {
            target.textContent = 'No need to unzip.';
            return;
        }
        target.innerHTML = `<div>Zip: ${stats.bytesEnd} Bytes</div>`;
        target.innerHTML += `<div>Unzip: ${stats.bytesStart} Bytes</div>`;
        target.innerHTML += `<div>T: ${stats.totalTimeMs}ms</div>`;
        target.innerHTML += `<div>Text lenght: ${stats.textLength} chars</div>`;
    }
};

uploadToZip.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    await zipper.parseFile(file);
    zipTxt.value = zipper.input;
    zipBtn.disabled = false;
});

zipTxt.addEventListener('input', () => {
    zipBtn.disabled = !zipTxt.value.length;
});

zipBtn.addEventListener('pointerdown', async () => {
    if (!zipTxt.value && !zipper.input) {
        return;
    }

    zipper.stringToZip(zipTxt.value);
    await zipper.zip();
    zipperStats(zipStats);

    unzipPreview.textContent = '';
    downZipBtn.disabled = false;
    downUnzipBtn.disabled = true;
    resetBtn.disabled = false;
});

downZipBtn.addEventListener('pointerdown', () => {
    zipper.download('myZippedTestFile');
});

uploadToUnzip.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    await zipper.parseFile(file);

    unzipBtn.disabled = false;
});

unzipBtn.addEventListener('pointerdown', async () => {
    if (!zipper.input) {
        return;
    }

    await zipper.unzip();
    unzipPreview.textContent = zipper.output;
    zipperStats(unzipStats);
    downUnzipBtn.disabled = false;
    downZipBtn.disabled = true;
    resetBtn.disabled = false;
});

downUnzipBtn.addEventListener('pointerdown', () => {
    zipper.download('myUnzippedTestFile');
});

resetBtn.addEventListener('pointerdown', () => {
    zipper.flush();
    zipper.flushStats();
    zipTxt.value = '';
    unzipPreview.textContent = '';
    uploadToZip.value = '';
    uploadToUnzip.value = '';
    zipperStats();
    document.querySelectorAll('button').forEach((btn) => {
        btn.disabled = true;
    });
});
