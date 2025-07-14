import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import * as taskModel from '../models/taskModel';

export const getTasksByUser = async (req: AuthenticatedRequest, res: Response) => {
  const userId = Number(req.userId);

  if (isNaN(userId)) {
    return res.status(400).json({ error: 'Token Inválido' });
  }

  try {
    const tasks = await taskModel.getTasksByUser(userId);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar tarefas' });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    await taskModel.createTask(req.body);
    res.status(201).json({ message: 'Tarefa criada com sucesso' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar tarefa' });
  }
};

export const updateTaskStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { done } = req.body;
  try {
    await taskModel.updateTaskStatus(Number(id), done);
    res.json({ message: 'Tarefa atualizada com sucesso' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar tarefa' });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await taskModel.deleteTask(Number(id));
    res.json({ message: 'Tarefa deletada com sucesso' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar tarefa' });
  }
};