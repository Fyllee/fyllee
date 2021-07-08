import { applyDecorators, SerializeOptions } from '@nestjs/common';
import { constants } from '../constants';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function SerializerIncludeToken(): MethodDecorator {
  return applyDecorators(SerializeOptions({ groups: [constants.TOKEN_INCLUDED] }));
}
