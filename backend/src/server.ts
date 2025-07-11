import express from 'express';
import { db } from './config/database';

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT NOW() AS now');
    res.json({ message: 'Conexão bem-sucedida!', time: rows });
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    res.status(500).json({ error: 'Erro na conexão com o banco de dados' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});