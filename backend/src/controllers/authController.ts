import { Request, Response } from 'express';
import { db } from '../config/database';
import { UserLoginInput } from '../types/user';
import { sanitizeUser } from '../utils/sanitize';

export const login = async (req: Request, res: Response) => {
  const { username, password }: UserLoginInput = req.body;

  try {
    const [rows]: any = await db.query(
      'SELECT * FROM users WHERE username = ? AND password = ?',
      [username, password]
    ); //Fazendo de uma forma simples pra ter o projeto pronto antes de tentar com JWT e bcrypt

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const rawUser = rows[0];
    const user = sanitizeUser(rawUser);

    // Vai retornar ID, username e nome.
    res.json({
      message: 'Login realizado com sucesso',
      user
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor' });
  }
};