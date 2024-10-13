import { Filemakerrrr } from '../src/filemakerrrr.js';

const zipper = new Filemakerrrr();
const testString = `The toFixed() Method The most straightforward approach to round a number to two decimal places in JavaScript is using the toFixed() method. This method converts a number into a string, rounding it to a specified number of decimal places. let number = 2.123456; let rounded = number.toFixed(2); console.log(rounded); // Output: "2.12" Pros: Simple and easy to use. Directly gives you the rounded number in string format. Cons: Converts the number to a string, which might require conversion back to a number. Can lead to unexpected rounding due to its handling of floating-point arithmetic. To convert the result back to a number, you can wrap the toFixed() call with parseFloat():`;

const autoZipper = new Filemakerrrr(testString, { verbose: false });
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
