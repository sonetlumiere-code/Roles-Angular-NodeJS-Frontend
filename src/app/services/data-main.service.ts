import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserProfile } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class DataMainService {

  private userProfile = new BehaviorSubject<any>('');
  currentUserDetails = this.userProfile.asObservable();

  sendUserDetails(message: UserProfile) {
    this.userProfile.next(message);
  }

}
