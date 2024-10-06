import { errorLib } from './errorLibrary';

const charEval = (char) => {
    if (!char) {
        errorLib.parameterIsMissing();
    }
    if (typeof char !== 'string') {
        errorLib.dataExpected('string', char);
    }

    const charCode = char.charCodeAt(0);
    let standard;
    if (charCode <= 127) {
        standard = 'ascii';
    } else if (charCode <= 255) {
        standard = 'ascii extended';
    } else {
        standard = 'unicode';
    }

    return { charCode, standard };
};

export { charEval };
// toma un caracter,
//  evalua la longitud del caracter,
//      si es más de 1,
//          evalua si el primer caracter es especial '\'
//          evalua segundo caracter,
//          retorna el unicode
//
//      si es 1,
//          retorna el unicode
//
//  si el codigo es mayor que 128, lo marca como unicode, de lo contrario, como ascii
//
//  retorna un objeto con el código del caracter y el estandar del código
