export function validateNumber(value: number, min = 0, max = 100): value is number {
  return !Number.isNaN(value) && min <= value && value <= max;
}
