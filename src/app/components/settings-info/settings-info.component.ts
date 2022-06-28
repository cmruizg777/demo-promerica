import { DataService } from './../../services/data.service';
import { AppMessages } from './../../models/app-messages';
import { ProfileService } from './../../services/profile.service';
import { Profile } from './../../models/profile';
import { Component, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Router } from '@angular/router';
import { getAge } from 'src/app/util/functions';
import { hobbies } from 'src/app/models/statis-data';

@Component({
  selector: 'app-settings-info',
  templateUrl: './settings-info.component.html',
  styleUrls: ['./settings-info.component.scss']
})
export class SettingsInfoComponent implements OnInit {
  @Output() sendProfile = new EventEmitter<FormGroup>();
  messages: AppMessages = {
    brandTitle: '¡Hola! Configuremos tu perfil',
    brandSubtitle: 'Queremos conocerte mejor.',
    contentTitle: 'Tu información',
    contentSubtitle: 'Completa la siguiente información para completar tu perfil',
    imageTitle: 'Imágen perfil',
    component: 'info'
  }
  profile: Profile;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  hobbyCtrl = new FormControl('');
  filteredHobbies: Observable<string[]>;

  hobby: string = '';
  allHobbies: string[] = hobbies;

  @ViewChild('hobbyInput') hobbyInput!: ElementRef<HTMLInputElement>;

  profileForm!: FormGroup ;
  isYounger = false;
  constructor(private fb: FormBuilder, private profileService: ProfileService, private router: Router, private appData: DataService) {
    this.profile = new Profile();

    this.filteredHobbies = this.hobbyCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allHobbies.slice())),
    );
  }
  ngOnInit(): void {

    setTimeout(()=>{
      this.appData.setAppMessages(this.messages);
      let data = this.profileService.getProfile();
      this.setProfile(data);
    },0)
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      hobby: [''],
      birthday: ['', [Validators.required]],
      document: ['', Validators.required],
      image: ['', Validators.required]
    })

    this.profileService.getProfilePicture().subscribe(data => {
      this.setProfilePicture(data);
    })

  }
  setProfile(data: Profile|null){
    if(data){
      this.profile = data;
      this.profileForm.patchValue({
        name: this.profile.name,
        birthday: this.profile.birthday,
        hobby: this.profile.hobby,
        document: this.profile.document,
        image: this.profile.image
      })
      this.hobby = this.profile.hobby;
    }
  }

  setProfilePicture(profilePicture: string){
    this.profileForm.patchValue({image: profilePicture})
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.hobby = value;
    }
    event.chipInput!.clear();
    this.hobbyCtrl.setValue(null);
  }

  remove(hobby: string): void {
   this.hobby = '';
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.hobby =event.option.viewValue;
    this.hobbyInput.nativeElement.value = '';
    this.hobbyCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allHobbies.filter(hobby => hobby.toLowerCase().includes(filterValue));
  }

  public get isValid(){
    return this.profileForm.valid;
  }
  sendData(){
    if(this.isValid){
      this.profile = this.profileForm.value;
      this.profileService.setProfile(this.profile);
      this.router.navigate(['/settings-pokemon'])
    }
  }
  public calcAge(){
    let age = getAge(this.profileForm.value.birthday);
    this.isYounger = age < 18;
    if(this.isYounger){
      this.profileForm.setControl('document', this.fb.control('', []));
    }else{
      this.profileForm.setControl('document', this.fb.control('', [Validators.required]))
    }
  }
}
