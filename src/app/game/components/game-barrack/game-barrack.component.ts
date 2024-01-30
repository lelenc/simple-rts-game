import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-barrack',
  templateUrl: './game-barrack.component.html',
  styleUrl: './game-barrack.component.css'
})
export class GameBarrackComponent {
   //TODO: Use modell
   @Input('barrack') barrack: number = 0;
}
