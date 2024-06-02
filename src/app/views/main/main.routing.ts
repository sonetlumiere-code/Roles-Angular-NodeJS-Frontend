import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { RoleGuard } from 'src/app/auth/role.guard';
import { Role } from 'src/app/models/user.model';
import { MainComponent } from './main/main.component';
import { GoldComponent } from './protected/gold/gold.component';
import { SilverComponent } from './protected/silver/silver.component';

export const MainRoutes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'gold',
    component: GoldComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: [Role.Gold, Role.Moderator, Role.Admin]
    }
  },
  {
    path: 'silver',
    component: SilverComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: [Role.Silver, Role.Gold, Role.Moderator, Role.Admin]
    }
  }
];
