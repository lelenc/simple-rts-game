import { Component, Input } from '@angular/core';
import { Barrack } from '../../../modells/building';

@Component({
  selector: 'app-game-barrack',
  templateUrl: './game-barrack.component.html',
  styleUrl: './game-barrack.component.css'
})
export class GameBarrackComponent {
   //TODO: Use modell
   @Input('barrack') barrack: Barrack
}
