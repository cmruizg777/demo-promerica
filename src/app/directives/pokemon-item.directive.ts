import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPokemonItem]'
})
export class PokemonItemDirective {
  clicked: boolean = false;
  constructor(private el: ElementRef) { }
  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('#FFC600');
  }
  @HostListener('mouseleave') onMouseLeave() {
    if(!this.clicked)this.highlight('');
  }
  @HostListener('click') onClick() {
    this.clicked = !this.clicked;
    this.highlight('#FFC600');
  }
  private highlight(color: string) {
    this.el.nativeElement.parentElement.style.backgroundColor = color;
  }

}
