import { getAge } from 'src/app/util/functions';
import { Observable } from 'rxjs';
import { DataService } from './services/data.service';
import { AppMessages } from './models/app-messages';
import { FormGroup } from '@angular/forms';
import { ProfileService } from './services/profile.service';
import { Profile } from './models/profile';
import { SettingsInfoComponent } from './components/settings-info/settings-info.component';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  profile!: Profile;
  messages!: AppMessages;
  profilePicture: string = '';
  profileIsValid: boolean = false;
  hasProfile: boolean = false;

  constructor(private profileService: ProfileService, private appData: DataService) { }

  ngOnInit(): void {
    this.appData.messagesChanges().subscribe(m => this.messages = m)
    let data = this.profileService.getProfile();
    this.setProfile(data);
    this.profileService.profileChanges().subscribe(data => {
      this.setProfile(data);
    })
  }

  setProfile(data: Profile|null){
    if(data){
      this.profile =  data;
      this.profilePicture = data.image;
      this.hasProfile = true;
    }
  }
  setProfilePicture(event: any ){
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      let image;
      reader.onload = e => {
        image = reader.result;
        this.profilePicture = image?image.toString():'';
        this.profileService.updateProfilePicture(this.profilePicture);
      }
      reader.readAsDataURL(file);
    }
  }
  public getProfileAge(birthDate: Date){
    return getAge(birthDate);
  }
}
