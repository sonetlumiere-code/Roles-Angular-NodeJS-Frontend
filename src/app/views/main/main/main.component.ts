import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public userProfile!: UserProfile;

  constructor(
    private userService: UserService,
    private _dataService: DataService,
  ) {}

  ngOnInit() {
    if (this.userService.isLoggedIn()) {
      this.getUser();
    }
  }

  getUser() {
    this.userService.getUserProfile().subscribe({
      next: (res: any) => {
        this.userProfile = res['user'];
        console.log(this.userProfile);
        this._dataService.sendUserDetails(this.userProfile);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

}
