import { nanoid } from 'nanoid';

const SECRET_TOKEN_LENTGH = 32;

export default function generateToken(id: string): string {
  return `${nanoid(SECRET_TOKEN_LENTGH)}.${id}`;
}
