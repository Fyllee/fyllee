import type Jimp from 'jimp';

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

export const filterNames = ['blur', 'contrast', 'greyscale', 'opacity', 'pixelate', 'width', 'height'];
export type FilterNames = typeof filterNames[number];

export type Filters = {
  [K in FilterNames]: {
    validate: (x: unknown) => boolean;
    apply: (img: Jimp, value: number) => Jimp;
  };
};
