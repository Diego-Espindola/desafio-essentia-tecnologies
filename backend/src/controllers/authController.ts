import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../config/database';
import { UserLoginInput } from '../types/user';
import { sanitizeUser } from '../utils/sanitize';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const envIsEmpty: string = "vazio"

const JWT_SECRET: string = process.env.JWT_SECRET || envIsEmpty;
const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || envIsEmpty;
if (JWT_SECRET == envIsEmpty || JWT_EXPIRES_IN == envIsEmpty) {
  throw new Error('JWT_SECRET ou JWT_EXPIRES_IN não definido nas variáveis de ambiente.');
}

export const login = async (req: Request, res: Response) => {
  const { username, password }: UserLoginInput = req.body;

  try {
    const [rows]: any = await db.query(
      'SELECT * FROM users WHERE username = ?',
      [username]
    ); 

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const rawUser = rows[0];
    const passwordMatch = await bcrypt.compare(password, rawUser.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Credenciais inválidas' }); //Senha incorreta
    }

    const user = sanitizeUser(rawUser);
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'] });
    //console.log('JWT_EXPIRES_IN:', process.env.JWT_EXPIRES_IN);

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