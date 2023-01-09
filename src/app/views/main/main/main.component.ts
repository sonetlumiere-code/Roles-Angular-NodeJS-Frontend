import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { DataMainService } from 'src/app/services/data-main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public userProfile!: UserProfile;

  constructor(
    private userService: UserService,
    private _dataMainService: DataMainService,
  ) {}

  ngOnInit() {
    if (this.userService.isLoggedIn()) {
      this.getUser();
    }
  }

  getUser() {
    this.userService.getUserProfile().subscribe(
      (res: any) => {
        this.userProfile = res['user'];
        console.log(this.userProfile);
        this._dataMainService.sendUserDetails(this.userProfile);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

}
