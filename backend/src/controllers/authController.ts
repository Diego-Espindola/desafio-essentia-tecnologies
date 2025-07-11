import { Request, Response } from 'express';
import { db } from '../config/database';
import mysql from 'mysql2';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const [rows]: any = await db.query(
      'SELECT * FROM users WHERE username = ? AND password = ?',
      [username, password]
    ); //Fazendo de uma forma simples pra ter o projeto pronto antes de tentar com JWT e bcrypt

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const user = rows[0];

    // Vai retornar o nome, username e ID
    res.json({
      message: 'Login realizado com sucesso',
      user: {
        id: user.id,
        username: user.username,
        nome: user.nome
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor' });
  }
};