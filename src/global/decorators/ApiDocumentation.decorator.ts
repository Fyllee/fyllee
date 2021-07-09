import type { HttpStatus } from '@nestjs/common';
import { applyDecorators } from '@nestjs/common';
import type { ApiResponseOptions } from '@nestjs/swagger';
import { ApiResponse } from '@nestjs/swagger';
import { ErrorDto } from '../dto/error.dto';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function ApiDocumentation(doc: Partial<Record<HttpStatus, ApiResponseOptions>>): MethodDecorator {
  const decorators: MethodDecorator[] = [];

  for (const [status, options] of Object.entries(doc)) {
    decorators.push(ApiResponse({
      type: Number(status) >= 400 ? ErrorDto : undefined, // eslint-disable-line no-undefined
      ...options,
      status: Number(status),
    }));
  }

  return applyDecorators(...decorators);
}
