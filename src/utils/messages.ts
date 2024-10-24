import type { Messages } from './types';

export const message: Messages = {
    en: {
        zip: {
            alreadyZipped: 'The file is already zipped',
            analize: 'Parsing the text...',
            rate: (rate: number) =>
                `The zipped file would be around ${rate.toFixed(2)} the size if it was a .txt`,
            willNotZip: 'There is no need to zip the string.',
            willZip: 'The zip process has started...',
            zipMap: 'Making the zip map...',
            zipString: 'Zipping the string...',
            readyToDownload: 'Ready to download',
        },
        upload: {
            fileFormarError: 'The file is not a valid F4R format.',
            upload: 'Uploading the file...',
            uploaded: 'The file was uploaded correctly.',
            uploadError: 'Error during file upload.',
        },
        unzip: {
            alreadyUnzipped: 'The file is already unzipped',
            parsingBuffer: 'Reading the buffer...',
            unzippingString: 'Unzipping the string...',
            readyToDownload: 'File ready to download.',
            unzipError: 'An error occurred while unzipping the file.',
        },
        err: {
            fileFormat: 'The file is not a valid F4R format',
        },
        download: {
            nothing: 'There is no info to download',
            start: 'Starting download...',
            end: 'Download completed.',
        },
        stats: {
            notAvailable: 'Todavía no hay estadísticas disponibles.',
        },
    },
    es: {
        zip: {
            alreadyZipped: 'El archivo ya se encuentra comprimido',
            analize: 'Analizando el texto...',
            rate: (rate: number) =>
                `El archivo comprimido será aproximadamente ${rate.toFixed(2)} del tamaño de sin fuera un .txt`,
            willNotZip: 'No es necesario comprimir.',
            willZip: 'Iniciando el proceso de compresión...',
            zipMap: 'Elaborando la tabla de caracteres...',
            zipString: 'Transcribiendo la cadena de caracteres...',
            readyToDownload: 'Archivo listo para descargar.',
        },
        upload: {
            fileFormarError: 'El archivo no es un formato F4R válido.',
            upload: 'Subiendo el archivo...',
            uploaded: 'El archivo se cargó correctamente.',
            uploadError: 'Error durante la carga del archivo.',
        },
        unzip: {
            alreadyUnzipped: 'El archivo ya está descomprimido',
            parsingBuffer: 'Leyendo el buffer...',
            unzippingString: 'Descomprimiendo la cadena...',
            readyToDownload: 'Archivo listo para descargar.',
            unzipError: 'Sucedió un error mientras se descomprimia el archivo.',
        },
        err: {
            fileFormat: 'El archivo no es un formato F4R válido.',
        },
        download: {
            nothing: 'No hay informacion para descargar.',
            start: 'Iniciando descarga...',
            end: 'descarga finalizada',
        },
        stats: {
            notAvailable: 'Todavía no hay estadísticas disponibles.',
        },
    },
};
