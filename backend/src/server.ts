import express from 'express';
import taskRoutes from './routes/taskRoutes';
import authRoutes from './routes/authRoutes';
import { db } from './config/database';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', taskRoutes);
app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});