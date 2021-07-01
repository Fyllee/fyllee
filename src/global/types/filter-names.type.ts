// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
export interface ParsedQs {
  [key: string]: ParsedQs | ParsedQs[] | string[] | string | undefined;
}

export interface Filters {
  blur?: number;
  pixelate?: number;
  opacity?: number;
  contrast?: number;
  rotate?: number;
  greyscale?: boolean;
  sepia?: boolean;
  opaque?: boolean;
  mirror?: string;
  width?: number;
  height?: number;
}
