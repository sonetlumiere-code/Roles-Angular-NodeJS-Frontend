import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent {

  usernameRegex = /^[a-zA-Z0-9](?:[a-zA-Z0-9_-]*[a-zA-Z0-9])?$/;
  emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSucessMessage!: boolean;
  serverErrorMessages!: string;
  acceptTermsAndConditions!: boolean;

  constructor(
    public userService: UserService
  ) { }

  onSubmit(form: NgForm) {
    this.userService.postUser(form.value).subscribe(
      (res) => {
        console.log(res);
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        form.resetForm();
        this.resetForm(form);
      },
      (err) => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
          setTimeout(() => this.resetForm(form), 4000);
          form.resetForm();
        } else {
          this.serverErrorMessages = 'Algo salió mal. Intente más tarde.';
        }
      }
    );
  }

  resetForm(form: NgForm) {
    this.userService.initialUser = {
      username: '',
      email: '',
      password: ''
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }

}