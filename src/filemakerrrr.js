import { stringChecker } from './charcounter.js';
import { errorLib } from './errorLibrary.js';
import { zipForecast } from './compressionEval.js';
import { gardener } from './gardener.js';
import { compressionTable } from './compressionTable.js';
import { compressor } from './compressor.js';
import { assembler } from './assembler.js';
import { binaryBufferForBrowser } from './makeBinaryBuffer.js';
import { fileLoader } from './fileLoader.js';
import { fileCheck } from './fileCheck.js';
import { fileDownload } from './fileDownload.js';
import { parseBufferToBin } from './parseBufferToBin.js';
import { parseBinToChar } from './parseBinToChar.js';
import { message } from './messages.js';

// TODO:
// 2. refactorizacion y ordenada del codigo
// 3. Montaje de la biblioteca
// 4. Readme
// 5. npm

export class Filemakerrrr {
    #downloadName;
    #alwaysZip;
    #verbose;
    #listener;
    #lang;

    #zipInput = null;
    #zipOutput = null;
    #unzipFileBuffer = null;
    #unzipOutput = null;
    #zipFileFormat;

    constructor(
        fileOrString = undefined,
        { downloadName, alwaysZip, verbose, talkToMeCallbak, lang } = {},
    ) {
        this.#downloadName = downloadName ?? 'miFile';
        this.#alwaysZip = alwaysZip ?? false;
        this.#verbose = verbose ?? false;
        this.#listener = talkToMeCallbak ?? console.log;
        this.#lang = lang ?? 'es';

        if (typeof fileOrString === 'string') {
            this.#zipInput = fileOrString;
            this.#fastZip();
        }
    }

    #fastZip() {
        this.zip()
            .then(() => this.downloadZip())
            .catch((err) => {
                throw new Error('Compression Failed');
            });
    }

    flush() {
        this.#zipInput = null;
        this.#zipOutput = null;
        this.#unzipFileBuffer = null;
        this.#unzipOutput = null;
    }

    forceIt(alwaysZip = true) {
        this.#alwaysZip = alwaysZip;
        return this;
    }

    stringToZip(string) {
        if (!string) {
            errorLib.parameterIsMissing();
        }
        if (typeof string !== 'string') {
            errorLib.dataExpected('string', string);
        }

        this.#zipInput = string;
        return this;
    }

    async zip() {
        if (!this.#zipInput) {
            throw new Error('Provide a string to zip before you zip it, duh!');
        }

        this.#talkToYou(['zip', 'analize']);

        const { charsMap, charsUnicode } = await stringChecker(this.#zipInput);
        const { should, rate } = zipForecast(
            this.#zipInput.length,
            charsMap.size,
            charsUnicode,
        );

        this.#talkToYou(['zip', 'rate', rate]);

        if (!this.#alwaysZip && !should) {
            this.#talkToYou(['zip', 'willNotZip']);
            this.#zipOutput = this.#zipInput;
            this.#zipFileFormat = false;
            return this;
        }

        this.#talkToYou(['zip', 'willZip']);
        this.#talkToYou(['zip', 'zipMap']);

        const charsHeap = await gardener(charsMap);
        const zippedCharMap = compressionTable(charsHeap);

        this.#talkToYou(['zip', 'zipString']);

        const zippedString = await compressor(this.#zipInput, zippedCharMap);
        const binarySecuence = assembler(zippedCharMap, zippedString);
        this.#zipOutput = await binaryBufferForBrowser(binarySecuence);
        this.#zipFileFormat = true;

        this.#talkToYou(['zip', 'readyToDownload']);

        return this;
    }

    async parseFile(file) {
        try {
            this.#talkToYou(['unzip', 'upload']);

            const fileData = await fileLoader(file);
            this.#unzipFileBuffer = fileCheck(fileData);

            if (!this.#unzipFileBuffer) {
                this.#talkToYou(['unzip', 'fileFormarError']);

                new Error('El archivo no es un formato F4R válido.');
            }

            return this.#unzipFileBuffer;
        } catch (err) {
            this.#talkToYou(['unzip', 'uploadError']);

            new Error('hubo un error en la carga del archivo');
        }
    }

    async unzip() {
        try {
            this.#talkToYou(['unzip', 'parsingBuffer']);

            const binaryString = await parseBufferToBin(this.#unzipFileBuffer);

            this.#talkToYou(['unzip', 'unzippingString']);

            const unzippedString = await parseBinToChar(binaryString);
            this.#unzipOutput = unzippedString;

            this.#talkToYou(['unzip', 'readyToDownload']);

            return unzippedString;
        } catch {
            this.#talkToYou(['unzip', 'unzipError']);

            new Error(
                'hubo un error al descomprimir el archivo, intentalo más tarde',
            );
        }
    }

    downloadZip(name = this.#downloadName) {
        this.#talkToYou(['download', 'start']);
        fileDownload(name, this.#zipOutput, this.#zipFileFormat);
    }

    downloadUnzip(name = this.#downloadName) {
        this.#talkToYou(['download', 'start']);
        fileDownload(name, this.#unzipOutput, false);
    }

    talkToMe(verbose = true) {
        this.#verbose = verbose;
        return this;
    }

    addListener(callback) {
        this.#listener = callback;
        return this;
    }

    #talkToYou([process, key, args], always = false) {
        if (!always && !this.#verbose) {
            return;
        }

        const baseOutput = message[this.#lang][process][key];
        const finalOutput = args ? baseOutput(args) : baseOutput;
        this.#listener(finalOutput);
    }
}
