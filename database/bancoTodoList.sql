CREATE DATABASE IF NOT EXISTS todolist CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE todolist;

-- Usuários
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  nome VARCHAR(100) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB;

-- Tarefas
CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  done BOOLEAN DEFAULT FALSE,
  user_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB;



-- Usuário administrador
INSERT INTO users (username, password, nome)
VALUES (
  'admin',
  'admin123',
  'Admnistrador Essentia'
);

-- Recupera o ID do usuário recém-inserido
SET @user_id = LAST_INSERT_ID();

-- Tarefas exemplo para o admin
INSERT INTO tasks (title, description, user_id, done)
VALUES
(
  'Criar nova tarefa',
  'Preencha o título e a descrição, então clique em "Adicionar Tarefa" .',
  @user_id,
  FALSE
),
(
  'Marcar tarefa como concluída',
  'Experimente clicar no Check ao lado de uma tarefa para marcá-la como feita.',
  @user_id,
  FALSE
),
(
  'Excluir uma tarefa',
  'Clique no ícone de lixeira para remover tarefas que não são mais necessárias.',
  @user_id,
  FALSE
),
(
  'Editar uma tarefa existente',
  'Clique no ícone de lápis ao lado da tarefa para modificar seus detalhes.',
  @user_id,
  FALSE
),
(
  'Parabéns!',
  'Você está pronto para usar seu gerenciador de tarefas. Boa sorte!',
  @user_id,
  FALSE
);