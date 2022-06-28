import { AppMessages } from './../models/app-messages';
import { Subject } from 'rxjs';
import { Profile } from './../models/profile';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  $_messages: Subject<AppMessages> = new Subject<AppMessages>();
  constructor() { }

  setAppMessages(messages: AppMessages){
    this.$_messages.next(messages);
  }
  messagesChanges(){
    return this.$_messages.asObservable();
  }
}
