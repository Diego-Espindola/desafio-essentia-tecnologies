import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { enviroment } from '../../../enviroments/enviroment';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login-page',
  standalone:true,
  imports: [FormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css'
})
export class LoginPage {
  username = '';
  password = '';

    constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {}

  login() {
    const body = {
      username: this.username,
      password: this.password
    };

    this.http.post<any>(`${enviroment.apiUrlLogin}/login`, body).subscribe({
      next: (response) => {
        console.log('Login OK:', response);
        // Salvar o user e token no localStorage
        this.userService.setSession(response.user, response.token);
        
        this.router.navigate(['/todoApp']);
      },
      error: (err) => {
        console.error('Erro ao fazer login:', err);
        if (err.status === 401) {
          alert('Credenciais inválidas');
        } else {
          alert('Erro no servidor, verifique se seu banco de dados está ativo.');
        }
      }
    });
  }
}
