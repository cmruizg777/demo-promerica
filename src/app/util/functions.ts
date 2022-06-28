import { pokemonTypes } from './../models/statis-data';
export function getAge(birthDate: any): number{
  var today = new Date();
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
export function translateType(type: string){
  return pokemonTypes.find( t => t.name == type)?.es;
}
export function getColorType(type: string){
  return pokemonTypes.find( t => t.name == type)?.color;
}
