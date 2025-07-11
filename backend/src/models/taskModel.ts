import { db } from "../config/database";
import { Task } from "../types/task";

export const getTasksByUser = async (userId: number): Promise<Task[]> => {
    const [rows] = await db.query('SELECT * FROM tasks WHERE user_id = ?', [userId])
    return rows as Task[];
}

export const createTask = async (task: Task): Promise<void> => {
  const { title, description, user_id } = task;
  await db.query(
    'INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)',
    [title, description, user_id]
  );
};

export const updateTaskStatus = async (id: number, done: boolean): Promise<void> => {
  await db.query('UPDATE tasks SET done = ? WHERE id = ?', [done, id]);
};

export const deleteTask = async (id: number): Promise<void> => {
  await db.query('DELETE FROM tasks WHERE id = ?', [id]);
};