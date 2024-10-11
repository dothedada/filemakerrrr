export const toBin = (number, pad = 0) => {
    return number ? number.toString(2).padStart(pad, '0') : '';
};
export const toDecimal = (binary) => Number.parseInt(binary, 2);
