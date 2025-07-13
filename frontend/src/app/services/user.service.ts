import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root'})
export class UserService {
  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  setSession(user: any, token: string) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  }

  clearUser() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean { 
    return !!this.getToken();
  }
}