import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-warrior',
  templateUrl: './game-warrior.component.html',
  styleUrl: './game-warrior.component.css'
})
export class GameWarriorComponent {
   //TODO: Use modell
   @Input('warrior') warrior: number = 0;
}
