
import {AbstractControl, ValidatorFn} from '@angular/forms';

export class MyValidators{
  static validateNameOrId(control: AbstractControl) {
    let value = control.value?control.value.trim():'';
    let namePattern = /([a-z]+)/ig;
    let idPattern = /([0-9]+)/ig;
    let matches ;
    if(namePattern.test(value) && !idPattern.test(value)){
      matches = value.match(namePattern);
      if(matches != null && matches[0].length == value.length)  return null;
    }
    if(idPattern.test(value) && !namePattern.test(value)){
      matches = value.match(idPattern);
      if(matches != null && matches[0].length == value.length && Number(value)>0)  return null;
    }

    return {validateNameOrId: true};
  }

}
