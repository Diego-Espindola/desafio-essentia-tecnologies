import { Routes } from '@angular/router';
import { LoginPage } from './components/login-page/login-page';
import { TodoPage } from './components/todo-page/todo-page';

export const routes: Routes = [
    {
        path: "",
        component: LoginPage
    },
    {
        path: 'todoApp',
        component: TodoPage
    }
];
