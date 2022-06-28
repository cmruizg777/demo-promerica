import { abilities } from './../../models/statis-data';
import { DataService } from './../../services/data.service';
import { AppMessages } from './../../models/app-messages';
import { Profile } from './../../models/profile';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile!:Profile;
  messages: AppMessages = {
    brandTitle: '',
    brandSubtitle: '',
    contentTitle: 'Mis Pokémon',
    contentSubtitle: '',
    imageTitle: 'Entrenador',
    component: 'profile'
  }
  abilities = abilities;
  //color: ThemePalette = "success";
  constructor(private profileService: ProfileService, private appData: DataService) { }

  ngOnInit(): void {

    setTimeout(()=>{
      this.appData.setAppMessages(this.messages);
      let data = this.profileService.getProfile();
      this.setProfile(data);
      this.profileService.profileChanges().subscribe(p => {
        this.setProfile(p)
      });
    },0)
  }
  setProfile(data: Profile|null){
    if(data){
      this.profile = data;
      this.messages.brandTitle = `¡Hola ${this.profile.name}!`;
      this.appData.setAppMessages(this.messages)
    }
  }
}
