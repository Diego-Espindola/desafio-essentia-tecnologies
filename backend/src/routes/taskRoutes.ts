import { Router } from 'express';
import * as taskController from '../controllers/taskController';

const router = Router();

router.get('/users/:userId/tasks', taskController.getTasksByUser);
router.post('/tasks', taskController.createTask);
router.put('/tasks/:id', taskController.updateTaskStatus);
router.delete('/tasks/:id', taskController.deleteTask);

export default router;