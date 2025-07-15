import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { enviroment } from '../../../enviroments/enviroment';
import { Router } from '@angular/router';

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
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.userService.getUser();

    if (this.user) {
      this.loadTasks();
    } else {
      console.warn('Usuário não encontrado. Redirecione para login se necessário.');
    }
  }

  logout(){
    this.userService.clearUser();
    this.router.navigate(['/']);
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

  addTask(form: NgForm) {
    
    if (form.invalid) {
      return;
    }

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

    
  deleteTask(task: any) {
    this.http.delete(`${enviroment.apiUrlTasks}/${task.id}`).subscribe({
      next: () => this.loadTasks(),
      error: (err) => console.error('Erro ao excluir tarefa:', err)
    });
  }

  markAsDone(task: any) {
    task.done = !task.done
    this.http.put(`${enviroment.apiUrlTasks}/status/${task.id}`, { done: task.done }).subscribe({
      next: () => this.loadTasks(),
      error: (err) => console.error('Erro ao marcar como feita:', err)
    });
  }

  // Variáveis para edição inline
  editTaskId: number | null = null;
  editTaskTitle: string = '';
  editTaskDescription: string = '';

  // Ao clicar em "Editar"
  startEdit(task: any) {
    this.editTaskId = task.id;
    this.editTaskTitle = task.title;
    this.editTaskDescription = task.description || '';
  }

  // Cancelar edição
  cancelEdit() {
    this.editTaskId = null;
    this.editTaskTitle = '';
    this.editTaskDescription = '';
  }

  // Salvar edição e enviar PUT para backend
  saveEdit(task: any) {

    const updatedTask = {
      ...task,
      title: this.editTaskTitle.trim(),
      description: this.editTaskDescription.trim()
    };

    this.http.put(`${enviroment.apiUrlTasks}/${task.id}`, updatedTask).subscribe({
      next: () => {
        this.editTaskId = null;
        this.loadTasks(); // Atualiza lista após salvar
      },
      error: (err) => {
        console.error('Erro ao atualizar tarefa:', err);
        alert('Erro ao atualizar tarefa');
      }
    });
  }

}
