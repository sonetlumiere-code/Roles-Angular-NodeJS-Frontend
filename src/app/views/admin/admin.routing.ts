import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { RoleGuard } from 'src/app/auth/role.guard';
import { Role } from 'src/app/models/user.model';

export const AdminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: [Role.Admin, Role.Moderator]
    }
  }
];
