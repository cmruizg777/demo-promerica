import { Pokemon } from './../../models/pokemon';
import { ApiService } from './../../services/api.service';
import { FormBuilder } from '@angular/forms';
import { Profile } from './../../models/profile';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings-pokemon',
  templateUrl: './settings-pokemon.component.html',
  styleUrls: ['./settings-pokemon.component.scss']
})
export class SettingsPokemonComponent implements OnInit {
  pokemonList: Pokemon[] = [];
  profile: Profile;

  hobby: string = '';

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.profile = new Profile();
  }
  ngOnInit(): void {
    this.initialize();
  }
  async initialize(){
    this.pokemonList = await this.api.getPokemonList();
    this.pokemonList = await Promise.all(
      this.pokemonList.map(async  p => this.api.getPokemonInfo(p.name))
    );
  }
  getPokemonInfo(pokemon: Pokemon){
    this.api.getPokemonInfo(pokemon.name).then(p => {
      pokemon = p;
      console.log(p)
    })
  }
  imageIsUploaded(){
    return false;
  }

  isValid(){
    return true;
  }
}
