import { Pipe, PipeTransform } from '@angular/core';
import { getColorType } from '../util/functions';

@Pipe({
  name: 'typeColor'
})
export class TypeColorPipe implements PipeTransform {

  transform(value: string): string {
    let color = getColorType(value);
    return color ? color: "";
  }
}
