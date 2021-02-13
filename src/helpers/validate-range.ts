export default function validateRange(value: number, min = 0, max = 100): boolean {
  return min <= value && value <= max;
}
