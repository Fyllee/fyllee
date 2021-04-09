import type { ValidationOptions } from 'class-validator';
import { ValidateIf } from 'class-validator';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function CanBeEmpty(validationOptions?: ValidationOptions): PropertyDecorator {
  return ValidateIf((_obj, value) => value !== null && typeof value !== 'undefined' && value !== '', validationOptions);
}
