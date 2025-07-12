// utils/sanitize.ts
import { UserOutput } from '../types/user';

export function sanitizeUser(rawUser: any): UserOutput {
  return {
    id: rawUser.id,
    username: rawUser.username,
    nome: rawUser.nome
  };
}