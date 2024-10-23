export type Standard = 'ascii' | 'asciiExt' | 'unicode' | 'outOfBMP';

const charEval = (char: string): { code: number; standard: Standard } => {
    const code = char.charCodeAt(0);

    let standard: Standard;
    if (code <= 127) {
        standard = 'ascii';
    } else if (code <= 255) {
        standard = 'asciiExt';
    } else if (code <= 65536) {
        standard = 'unicode';
    } else {
        standard = 'outOfBMP';
    }

    return { code, standard };
};

export { charEval };
