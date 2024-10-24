export const toBin = (number: number, pad = 0): string =>
    number.toString(2).padStart(pad, '0');
export const toDecimal = (binary: string): number => Number.parseInt(binary, 2);
