
import { ProfileComponent } from './components/profile/profile.component';
import { SettingsPokemonComponent } from './components/settings-pokemon/settings-pokemon.component';
import { SettingsInfoComponent } from './components/settings-info/settings-info.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',redirectTo:'settings-info', pathMatch: 'full' },
  {path:'settings-info', component: SettingsInfoComponent},
  {path:'settings-pokemon', component: SettingsPokemonComponent},
  {path:'profile', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
