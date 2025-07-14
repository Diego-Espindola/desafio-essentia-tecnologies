import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../config/database';
import { UserLoginInput } from '../types/user';
import { sanitizeUser } from '../utils/sanitize';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
if (!JWT_SECRET || !JWT_EXPIRES_IN) {
  throw new Error('JWT_SECRET ou JWT_EXPIRES_IN não definido nas variáveis de ambiente.');
}

export const login = async (req: Request, res: Response) => {
  const { username, password }: UserLoginInput = req.body;

  try {
    const [rows]: any = await db.query(
      'SELECT * FROM users WHERE username = ? AND password = ?',
      [username, password]
    ); 

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const rawUser = rows[0];
    const user = sanitizeUser(rawUser);
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    console.log('JWT_EXPIRES_IN:', process.env.JWT_EXPIRES_IN);

    res.set('Cache-Control', 'no-store');
    // Vai retornar ID, username e nome.
    res.json({
      message: 'Login realizado com sucesso',
      user,
      token
    });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};