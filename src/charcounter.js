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

// crear el árbol de huffman
// ingresa valores a un minHeap
// comprueba extensión de la tabla,
//    si la tabla tiene más de dos valores
//      valor 1: toma el menor valor,
//      valor 2: toma el siguiente menor valor,
//      crea valor 3: { valor compuesto: valor 1 + valor 2, izquierda: valor 1, derecha: valor 2 }
//      ingresa el valor 3 al minHeap
//    si la tabla solo tiene un valo
//      exporta el árbol
//
//
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
//
// toma la info, la pasa a binario y la exporta
