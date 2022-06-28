import { Pipe, PipeTransform } from '@angular/core';
import { translateType } from '../util/functions';

@Pipe({
  name: 'pokemonType'
})
export class PokemonTypePipe implements PipeTransform {

  transform(value: string): string {
    let translate = translateType(value);
    return translate ? translate: value;
  }

}
