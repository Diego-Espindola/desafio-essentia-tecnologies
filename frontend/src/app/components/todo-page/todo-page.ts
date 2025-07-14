import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { enviroment } from '../../../enviroments/enviroment';

@Component({
  selector: 'app-todo-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-page.html',
  styleUrl: './todo-page.css'
})

export class TodoPage implements OnInit {
  user: any = null;
  tasks: any[] = [];
  errorMessage: string | null = null;

  // Novas tarefas - campos do formulário
  newTask = {
    title: '',
    description: ''
  };


  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.user = this.userService.getUser();

    if (this.user) {
      this.loadTasks();
    } else {
      console.warn('Usuário não encontrado. Redirecione para login se necessário.');
    }
  }

  loadTasks() {
    this.http.get<any[]>(`${enviroment.apiUrlTasks}`)
      .subscribe({
        next: (tasks) => {
            this.tasks = tasks;
            this.errorMessage = null; // Tasks vieram do banco
        },
        error: (err) => {
          console.error('Erro ao buscar tarefas:', err);
          this.tasks = ['',''];
          this.errorMessage = 'Erro ao carregar tarefas. Verifique seu banco de dados e tente novamente.'; // Mensagem de erro genérica
        }
      });
  }

  addTask() {
    const taskData = {
      title: this.newTask.title,
      description: this.newTask.description,
      user_id: this.user.id
    };

    this.http.post(`${enviroment.apiUrlTasks}`, taskData).subscribe({
      next: (res) => {
        this.newTask.title = '';
        this.newTask.description = '';
        this.loadTasks(); // recarrega lista
      },
      error: (err) => {
        console.error('Erro ao adicionar tarefa:', err);
      }
    });
  }

  markAsDone(task: any) {
    task.done = !task.done
    this.http.put(`${enviroment.apiUrlTasks}/${task.id}`, { done: task.done }).subscribe({
      next: () => this.loadTasks(),
      error: (err) => console.error('Erro ao marcar como feita:', err)
    });
  }

  deleteTask(task: any) {
    this.http.delete(`${enviroment.apiUrlTasks}/${task.id}`).subscribe({
      next: () => this.loadTasks(),
      error: (err) => console.error('Erro ao excluir tarefa:', err)
    });
  }
}
