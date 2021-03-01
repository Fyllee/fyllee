import { nanoid } from 'nanoid';

const SECRET_TOKEN_LENGHT = 64;

export default function generateToken(id: string): string {
  return `${nanoid(SECRET_TOKEN_LENGHT)}.${id}`;
}
