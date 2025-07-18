import { Router } from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import * as taskController from '../controllers/taskController';

const router = Router();

router.use(authenticateToken);

router.get('/tasks', taskController.getTasksByUser);
router.post('/tasks', taskController.createTask);
router.put('/tasks/status/:id', taskController.updateTaskStatus);
router.put('/tasks/:id', taskController.editTask);
router.delete('/tasks/:id', taskController.deleteTask);

export default router;