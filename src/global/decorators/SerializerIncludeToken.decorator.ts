import { applyDecorators, SerializeOptions } from '@nestjs/common';
import { TOKEN_INCLUDED } from '../constants';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function SerializerIncludeToken(): MethodDecorator {
  return applyDecorators(SerializeOptions({ groups: [TOKEN_INCLUDED] }));
}
