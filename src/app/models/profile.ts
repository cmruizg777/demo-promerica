import { Pokemon } from './pokemon';

export class Profile{
  id: number;
  name: string;
  birthday: Date;
  hobby: string;
  document: string;
  image: string;
  pokemons: Pokemon[] = [];
  constructor(name = '', birthday = new Date(), document='', hobby = '', image = ''){
    this.name = name;
    this.birthday = birthday;
    this.document = document;
    this.hobby = hobby;
    this.image = image;
    this.id = 0
  }
  randomId(){
    return Math.ceil(Math.random()*100);
  }

}
