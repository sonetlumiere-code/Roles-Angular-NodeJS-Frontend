import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Role } from '../../../models/user.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html'
})
export class SignInComponent implements OnInit {

  public model = {
    email: '',
    password: ''
  };

  //emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  public serverErrorMessages!: string;
  private roles: string[] | false = [];

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
    console.log('sign in');
  }

  onSubmit(form: NgForm) {
    this.userService.login(form.value).subscribe(
      res => {
        this.userService.setToken(res['token']);
        this.roles = this.userService.getRoles();
        if (this.roles && (this.roles.includes(Role.Admin) || this.roles.includes(Role.Moderator))) {
          this.router.navigateByUrl('/admin'); //go to admin
        } else {
          this.router.navigateByUrl('/'); //go to main
        }
      },
      err => {
        this.serverErrorMessages = err.error.message;
        form.resetForm();
        setTimeout(() => this.serverErrorMessages = '', 3000);
      }
    );
  }

}
