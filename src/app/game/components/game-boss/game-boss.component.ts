import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-boss',
  templateUrl: './game-boss.component.html',
  styleUrl: './game-boss.component.css'
})
export class GameBossComponent {
   //TODO: Use modell
   @Input('boss') boss: number = 0;
}
