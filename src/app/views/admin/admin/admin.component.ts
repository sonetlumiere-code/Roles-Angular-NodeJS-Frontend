import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { DataMainService } from 'src/app/services/data-main.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public userProfile!: UserProfile;

  constructor(
    private userService: UserService,
    private _dataMainService: DataMainService,
  ) {}

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userService.getUserProfile().subscribe(
      (res: any) => {
        console.log(res);
        this.userProfile = res['user'];
        this._dataMainService.sendUserDetails(this.userProfile);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
