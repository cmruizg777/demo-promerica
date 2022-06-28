import { Profile } from './../models/profile';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  $_profilePictureSubject: Subject<string> = new Subject<string>();
  $_profileSubject: Subject<Profile> = new Subject<Profile>();
  constructor() { }

  public getProfile(): Profile|null{
    let jsonProfile = localStorage.getItem('profile');
    try{
      let profile: Profile = JSON.parse(jsonProfile ? jsonProfile: '');
      profile.birthday = new Date(profile.birthday);
      return profile;
    }catch(e){
      return null;
    }
  }
  public setProfile(profile: Profile){
    localStorage.setItem('profile',JSON.stringify(profile));
    this.$_profileSubject.next(profile);
  }
  public profileChanges(): Observable<Profile>{
    return this.$_profileSubject.asObservable();
  }
  public updateProfilePicture(picture: string){
    this.$_profilePictureSubject.next(picture);
  }
  public getProfilePicture(): Observable<string>{
    return this.$_profilePictureSubject.asObservable();
  }

}
