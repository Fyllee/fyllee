export function intOrUndefined(value: unknown): number | undefined {
  const parsed = Number.parseInt(String(value), 10);
  // eslint-disable-next-line no-undefined
  return Number.isNaN(parsed) ? undefined : Math.round(parsed);
}

export function floatOrUndefined(value: unknown): number | undefined {
  const parsed = Number.parseFloat(String(value));
  // eslint-disable-next-line no-undefined
  return Number.isNaN(parsed) ? undefined : parsed;
}
