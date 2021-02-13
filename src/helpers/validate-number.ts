// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export default function validateNumber(value: any): value is number {
  return !Number.isNaN(Number.parseInt(value, 10));
}
