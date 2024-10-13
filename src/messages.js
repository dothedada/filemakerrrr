const message = {
    en: {
        zip: {
            analize: 'Parsing the text...',
            rate: (rate) =>
                `The zipped file would be around ${rate} times the size if it was a .txt`,
            willNotZip: 'There is no need to zip the string.',
            willZip: 'The zip process has started...',
            zipMap: 'Making the zip map...',
            zipString: 'Zipping the string...',
            roadyToDownload: 'Ready to download',
        },
        unzip: {},
        err: {
            fileFormat: 'The file is not a valid F4R format',
        },
    },
    es: {
        zip: {
            analize: 'Analizando el texto...',
            rate: (rate) =>
                `El archivo comprimido será aproximadamente ${rate}veces el tamaño de sin fuera un .txt`,
            willNotZip: 'No es necesario comprimir.',
            willZip: 'Iniciando el proceso de compresión...',
            zipMap: 'Elaborando la tabla de caracteres...',
            zipString: 'Transcribiendo la cadena de caracteres...',
            roadyToDownload: 'Archivo listo para descargar.',
        },
        unzip: {},
        err: {
            fileFormat: 'El archivo no es un formato F4R válido.',
        },
    },
};

export { message };