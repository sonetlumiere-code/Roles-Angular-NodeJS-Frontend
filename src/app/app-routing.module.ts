import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './auth/users/users.component';
import { SignInComponent } from './auth/users/sign-in/sign-in.component';
import { SignUpComponent } from './auth/users/sign-up/sign-up.component';
import { AdminComponent } from './views/admin/admin/admin.component';

const routes: Routes = [
  {
    path: '',
    children: [{
      path: '',
      loadChildren: () => import('./views/main/main.module').then(module => module.MainModule)
    }]
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [{
      path: '',
      loadChildren: () => import('./views/admin/admin.module').then(module => module.AdminModule)
    }]
  },
  {
    path: 'signup',
    component: UsersComponent,
    children: [{
      path: '',
      component: SignUpComponent
    }]
  },
  {
    path: 'login',
    component: UsersComponent,
    children: [{
      path: '',
      component: SignInComponent
    }]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
