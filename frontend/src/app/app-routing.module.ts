import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListRoleComponent } from './admin/list-role/list-role.component';
import { ListUserComponent } from './admin/list-user/list-user.component';
import { RegisterRoleComponent } from './admin/register-role/register-role.component';
import { RegisterUserComponent } from './admin/register-user/register-user.component';
import { UpdateRoleComponent } from './admin/update-role/update-role.component';
import { UpdateUserComponent } from './admin/update-user/update-user.component';
import { ListBookComponent } from './board/list-book/list-book.component';
import { SaveBookComponent } from './board/save-book/save-book.component';
import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'listBooks',
    component: ListBookComponent,
  },
  { path: 'saveBook', 
  component: SaveBookComponent
 },
 {
   path: 'login',
   component: LoginComponent,
 },
 {
   path: 'signUp',
   component: RegisterComponent
 },
 {
   path: 'listUser',
   component: ListUserComponent
 },
 {
   path:'registerUser',
   component:RegisterUserComponent
 },
 {
   path: 'updateUser',
   component:UpdateUserComponent
 },
 {
   path: 'listRole',
   component: ListRoleComponent
 },
 {
   path: 'registerRole',
   component: RegisterRoleComponent
 },
 {
   path: 'updateRole',
   component: UpdateRoleComponent
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
