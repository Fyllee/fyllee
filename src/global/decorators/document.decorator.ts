import type { HttpStatus } from '@nestjs/common';
import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function ApiDocumentation(doc: Partial<Record<HttpStatus, string>>): MethodDecorator {
  const decorators: MethodDecorator[] = [];

  for (const [status, description] of Object.entries(doc))
    decorators.push(ApiResponse({ status: Number(status), description }));

  return applyDecorators(...decorators);
}
