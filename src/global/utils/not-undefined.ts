// eslint-disable-next-line @typescript-eslint/ban-types
export const notUndef = (x: unknown): x is object => typeof x !== 'undefined';
