export const fileIndex = (ascii, asciiExt, unicode) => {
    return `${ascii ? 1 : 0}${asciiExt ? 1 : 0}${unicode ? 1 : 0}`;
};
