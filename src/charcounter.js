import { errorLib } from './errorLibrary';

const stringChecker = (text) => {
    if (typeof text !== 'string') errorLib.dataExpected('string', text);

    const stringLength = text.length;
    const charactersUsed = new Map();

    for (const char of text) {
        charactersUsed.set(char, (charactersUsed.get(char) || 0) + 1);
    }

    return {
        stringLength,
        charactersUsed,
        charactersUsedLength: charactersUsed.size,
    };
};

export { stringChecker };

// remplaza cadena por binarios y tabla de decodificacion
//
// toma la info, la pasa a binario y la exporta
