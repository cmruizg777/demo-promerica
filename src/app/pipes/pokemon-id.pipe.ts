import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemonId'
})
export class PokemonIdPipe implements PipeTransform {

  transform(value: number): string {
    let result = '';
    for(let i = 3; i > value.toString().length ; i--){
      result = result + '0';
    }
    result = result + value.toString();
    return result;
  }

}
