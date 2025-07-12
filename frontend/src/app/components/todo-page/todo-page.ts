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
    this.http.get<any[]>(`${enviroment.apiUrl}/users/${this.user.id}/tasks`)
      .subscribe({
        next: (tasks) => {
          this.tasks = tasks;
        },
        error: (err) => {
          console.error('Erro ao buscar tarefas:', err);
        }
      });
  }

  addTask() {
    const taskData = {
      title: this.newTask.title,
      description: this.newTask.description,
      user_id: this.user.id
    };

    this.http.post(`${enviroment.apiUrl}/tasks`, taskData).subscribe({
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
    this.http.put(`${enviroment.apiUrl}/tasks/${task.id}`, { done: task.done }).subscribe({
      next: () => this.loadTasks(),
      error: (err) => console.error('Erro ao marcar como feita:', err)
    });
  }

  deleteTask(task: any) {
    this.http.delete(`${enviroment.apiUrl}/tasks/${task.id}`).subscribe({
      next: () => this.loadTasks(),
      error: (err) => console.error('Erro ao excluir tarefa:', err)
    });
  }
}
