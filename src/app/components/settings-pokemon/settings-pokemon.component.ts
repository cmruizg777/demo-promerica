import { MyValidators } from './../../util/validators';
import { ProfileService } from './../../services/profile.service';
import { DataService } from './../../services/data.service';
import { AppMessages } from './../../models/app-messages';
import { Pokemon } from './../../models/pokemon';
import { ApiService } from './../../services/api.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Profile } from './../../models/profile';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings-pokemon',
  templateUrl: './settings-pokemon.component.html',
  styleUrls: ['./settings-pokemon.component.scss']
})
export class SettingsPokemonComponent implements OnInit {
  @Output() sendProfile = new EventEmitter<Pokemon[]>();
  pokemonList: Pokemon[] = [];
  selectedPokemonList: Pokemon[] = [];
  selectionDisabled: boolean = false;
  profile: Profile;

  hobby: string = '';
  messages: AppMessages = {
    brandTitle: '¡Ya casi términamos!',
    brandSubtitle: 'Revisa la información, y completa lo solicitado.',
    contentTitle: 'Pokémon',
    contentSubtitle: 'Selecciona 3 Pokémon para que sean parte de tu equipo',
    imageTitle: '',
    component: 'pokemons'
  }
  searchControl!: FormControl;
  constructor(private api: ApiService, private appData: DataService, private profileService: ProfileService, private router: Router) {
    this.profile = new Profile();
  }
  ngOnInit(): void {
    this.initialize();
  }
  async initialize(){
    try{
      setTimeout(()=>{
        this.appData.setAppMessages(this.messages);
        let data = this.profileService.getProfile();
        if(data){
          this.profile = data;
          this.messages.imageTitle = this.profile.name;
          this.appData.setAppMessages(this.messages)
        }
      },0)
      this.searchControl = new FormControl('', [Validators.minLength(1), MyValidators.validateNameOrId])
      this.pokemonList = await this.api.getPokemonList();
      this.pokemonList = await Promise.all(
        this.pokemonList.map(async  p => this.api.getPokemonInfo(p.name))
      );
    }catch(e){
      console.log(e)
    }

  }
  getPokemonInfo(pokemon: Pokemon){
    this.api.getPokemonInfo(pokemon.name).then(p => {
      pokemon = p;
      console.log(p)
    })
  }

  isValid(){
    return this.selectedPokemonList.length > 0;
  }
  selectItem(item: Pokemon){
    let exist = this.selectedPokemonList.find( p => p.id == item.id);
    if(!exist){
      if(!this.selectionDisabled)this.selectedPokemonList.push(item);
    }else{
      this.selectedPokemonList = this.selectedPokemonList.filter(p => p.id != item.id)
    }
    this.selectionDisabled = this.selectedPokemonList.length == 3;
  }
  isSelected(item: Pokemon){
    return this.selectedPokemonList.find( p => p.id == item.id);
  }
  setPokemonGroup(){
    this.profile.pokemons = this.selectedPokemonList;
    this.profileService.setProfile(this.profile);
    this.router.navigate(['profile']);
  }
  search(){
    if(!this.searchControl.invalid){
      this.api.getPokemonInfo(this.searchControl.value).then(data => {
        this.pokemonList = [];
        this.pokemonList.push(data);
      })
    }
  }
}
