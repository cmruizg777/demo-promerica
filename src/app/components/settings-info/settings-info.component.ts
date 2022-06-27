import { Profile } from './../../models/profile';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
@Component({
  selector: 'app-settings-info',
  templateUrl: './settings-info.component.html',
  styleUrls: ['./settings-info.component.scss']
})
export class SettingsInfoComponent implements OnInit {
  profile: Profile;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  hobbyCtrl = new FormControl('');
  filteredHobbies: Observable<string[]>;

  hobby: string = '';
  allHobbies: string[] = [
    'Jugar Fútbol',
    'Jugar Basquetball',
    'Jugar Tennis',
    'Jugar Voleibol',
    'Jugar Fifa',
    'Jugar Videojuegos'
  ];

  @ViewChild('hobbyInput') hobbyInput!: ElementRef<HTMLInputElement>;

  profileForm: FormGroup ;
  constructor(private fb: FormBuilder) {
    this.profile = new Profile();
    this.profileForm = new FormGroup({});

    this.filteredHobbies = this.hobbyCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allHobbies.slice())),
    );

  }
  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      hobby: [''],
      birthday: ['', [Validators.required]],
      document: ['', Validators.required],
      image: ['', Validators.required]
    })
    this.profileForm.valueChanges.subscribe(()=>{
      console.log(this.profileForm.value)
    })
  }
  setProfilePicture(event: any ){
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      let image;
      reader.onload = e => {
        image = reader.result;
        this.profile.image = image?image.toString():'';
        this.profileForm.patchValue({image: this.profile.image})
      }
      reader.readAsDataURL(file);
  }
  }
  imageIsUploaded(){
    return false;
  }


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.hobby = value;
    }

    // Clear the input value
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

  public isValid(){
    return !this.profileForm.valid;
  }
}
