import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings-info',
  templateUrl: './settings-info.component.html',
  styleUrls: ['./settings-info.component.scss']
})
export class SettingsInfoComponent implements OnInit {
  profileForm: FormGroup ;
  constructor(private fb: FormBuilder) {
    this.profileForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      hobby: [''],
      birthday: ['', [Validators.required]],
      document: ['', Validators.required]
    })
  }
  imageIsUploaded(){
    return false;
  }
}
