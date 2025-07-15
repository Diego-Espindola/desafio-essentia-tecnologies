//Utilizar o comando na pasta scripts-> npx ts-node create-user.ts <-Se não tiver, instale com npm install -D ts-node typescript @types/node
import bcrypt from 'bcrypt';
import { db } from '../src/config/database'; // ajuste o caminho conforme sua estrutura

async function criarUsuario() {
  const username = 'admin';
  const password = 'admin123';
  const nome = 'Administrador Essentia';

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.query(
    'INSERT INTO users (username, password, nome) VALUES (?, ?, ?)',
    [username, hashedPassword, nome]
  );
  console.log('Usuário criado com sucesso!');
  process.exit(); // encerra o script
}

criarUsuario().catch((err) => {
  console.error('Erro ao criar usuário:', err);
  process.exit(1);
});