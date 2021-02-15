export interface JwtPayload extends Record<string, string[] | number | string> {
  iss?: string;
  sub?: string;
  aud?: string[] | string;
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
}

// Types for the express' Query Parameters
// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
export interface ParsedQs {
  [key: string]: ParsedQs | ParsedQs[] | string[] | string | undefined;
}

const internalFilterNames = [
  'blur',
  'contrast',
  'greyscale',
  'opacity',
  'opaque',
  'pixelate',
  'sepia',
  'rotate',
  'height',
  'width',
  'mirror',
] as const;

export const filterNames = new Set<string>(internalFilterNames);
export type FilterNames = typeof internalFilterNames[number];
export type RequestedFilters = {
  [key in FilterNames]: string;
};
