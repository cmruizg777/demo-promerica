import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsPokemonComponent } from './settings-pokemon.component';

describe('SettingsPokemonComponent', () => {
  let component: SettingsPokemonComponent;
  let fixture: ComponentFixture<SettingsPokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsPokemonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
