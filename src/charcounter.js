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

// crea la tabla de decodificación
// decofificacion= [{caracter: binario}, {...}]
// funcion parseoNodos (nodo, valor acumulado)
//    si el nodo es hoja // no tiene hijos
//      valor acumulado += "Valor acumulado"
//      decodificacion.push({caracter: valor acumulado})
//      retorno
//    si el nodo tiene hijos
//      si tiene hijo a la izquierda, parseoNodos (nodo.izquierda, "O")
//      si tiene hijo a la derecha, parseoNodos (nodo.derecha, "1")
// retorna decodificacion
//
// remplaza cadena por binarios y tabla de decodificacion
//
// toma la info, la pasa a binario y la exporta
