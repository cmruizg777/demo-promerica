import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getPokemonList(): Promise<Pokemon[]>{
    return this.http.get<Pokemon[]>(this.getUrl('pokemon/?offset=0&limit=9'))
    .pipe<any[]>(map((data: any) => {
      const pokemonList: Pokemon[] = [];
      data.results.forEach((r: any) => {
        const pokemon = new Pokemon(0, r.name);
        pokemonList.push(pokemon)
      })
      return pokemonList;
    }))
    .toPromise();
  }
  getPokemonInfo(pokemonIdOrName: any): Promise<Pokemon>{
    return this.http.get<Pokemon>(this.getUrl(`pokemon/${pokemonIdOrName.toString()}`))
    .pipe(map((data: any) => {
      let pokemon = new Pokemon(
        data.id,
        data.name,
        data.sprites.other.home.front_default
        )
      pokemon.url_image2 = data.sprites.other.dream_world.front_default
      pokemon.types = data.types.map((t: any) => t = t.type.name);
      return pokemon;
    }))
    .toPromise();
  }
  getUrl(path: string){
    return  `${environment.baseUrl}${path}`
  }
}
