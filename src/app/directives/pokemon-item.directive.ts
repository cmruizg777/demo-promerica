import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appPokemonItem]'
})
export class PokemonItemDirective {
  selected: boolean = false;
  @Input() appPokemonItem = false;
  constructor(private el: ElementRef) { }
  @HostListener('mouseenter') onMouseEnter() {
    if(this.appPokemonItem && !this.selected) return;
    this.highlight('#FFC600');
  }
  @HostListener('mouseleave') onMouseLeave() {
    if(this.appPokemonItem && !this.selected) return;
    if(!this.selected)this.highlight('');
  }
  @HostListener('click') onClick() {
    if(this.appPokemonItem && !this.selected) return;
    this.selected = !this.selected;
    this.highlight('#FFC600');
  }
  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }

}
