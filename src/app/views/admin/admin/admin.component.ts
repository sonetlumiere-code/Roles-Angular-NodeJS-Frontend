import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public userProfile!: UserProfile;

  constructor(
    private userService: UserService,
    private _dataService: DataService,
  ) {}

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userService.getUserProfile().subscribe({
      next: (res) => {
        console.log(res);
        this.userProfile = res['user'];
        this._dataService.sendUserDetails(this.userProfile);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
