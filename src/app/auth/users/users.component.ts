import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  public userLogged!: boolean;

  constructor(
    private router: Router,
    private userService: UserService,
  ) {}

  ngOnInit() {
    if(this.userService.isLoggedIn()) {
      this.userLogged = true;
      this.router.navigateByUrl('/');
    } else {
      this.userLogged = false;
    }
  }

}
