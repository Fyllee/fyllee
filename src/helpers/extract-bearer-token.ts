export default function extractBearerToken(header: unknown[] | string): string | null {
  if (Array.isArray(header) || !header)
    return null;

  const [scheme, value] = header.split(' ');
  if (scheme.toLowerCase() !== 'bearer')
    return null;

  return value;
}
