import Jimp from 'jimp';

const allowed = {
  greyscale: (img: Jimp, _value: number): Jimp => img.greyscale(),
  contrast: (img: Jimp, value: number): Jimp => img.contrast(value),
  blur: (img: Jimp, value: number): Jimp => img.blur(value),
  opacity: (img: Jimp, value: number): Jimp => img.opacity(value),
  pixelate: (img: Jimp, value: number): Jimp => img.pixelate(value),
};

export default async function applyFilters(path: string, filters: Record<string, unknown>): Promise<Buffer> {
  try {
    const image = await Jimp.read(path);

    Object.entries(allowed).forEach((e) => {
      const [name, transform] = e;

      if (filters[name])
        transform(image, Number.parseInt(filters[name] as string, 10));
    });

    return await image.getBufferAsync(Jimp.MIME_PNG);
  } catch (e: unknown) {
    console.error(e);
  }
}
