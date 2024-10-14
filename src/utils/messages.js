const message = {
    en: {
        zip: {
            analize: 'Parsing the text...',
            rate: (rate) =>
                `The zipped file would be around ${rate.toFixed(2)} the size if it was a .txt`,
            willNotZip: 'There is no need to zip the string.',
            willZip: 'The zip process has started...',
            zipMap: 'Making the zip map...',
            zipString: 'Zipping the string...',
            readyToDownload: 'Ready to download',
        },
        unzip: {
            upload: 'Uploading the file...',
            uploadError: 'Error during file upload.',
            fileFormarError: 'The file is not a valid F4R format.',
            parsingBuffer: 'Reading the buffer...',
            unzippingString: 'Unzipping the string...',
            readyToDownload: 'File ready to download.',
            unzipError: 'An error occurred while unzipping the file.',
        },
        err: {
            fileFormat: 'The file is not a valid F4R format',
        },
        download: {
            start: 'Starting download...',
            end: 'Download completed.',
        },
    },
    es: {
        zip: {
            analize: 'Analizando el texto...',
            rate: (rate) =>
                `El archivo comprimido será aproximadamente ${rate.toFixed(2)} del tamaño de sin fuera un .txt`,
            willNotZip: 'No es necesario comprimir.',
            willZip: 'Iniciando el proceso de compresión...',
            zipMap: 'Elaborando la tabla de caracteres...',
            zipString: 'Transcribiendo la cadena de caracteres...',
            readyToDownload: 'Archivo listo para descargar.',
        },
        unzip: {
            upload: 'Subiendo el archivo...',
            uploadError: 'Error durante la carga del archivo.',
            fileFormarError: 'El archivo no es un formato F4R válido.',
            parsingBuffer: 'Leyendo el buffer...',
            unzippingString: 'Descomprimiendo la cadena...',
            readyToDownload: 'Archivo listo para descargar.',
            unzipError: 'Sucedió un error mientras se descomprimia el archivo.',
        },
        err: {
            fileFormat: 'El archivo no es un formato F4R válido.',
        },
        download: {
            start: 'Iniciando descarga...',
            end: 'descarga finalizada',
        },
    },
};

export { message };