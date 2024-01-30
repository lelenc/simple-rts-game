import { Component } from '@angular/core';

@Component({
  selector: 'app-game-playground',
  templateUrl: './game-playground.component.html',
  styleUrl: './game-playground.component.css'
})
export class GamePlaygroundComponent {
  rowSize: number = 10;
  colSize: number = 17;
}
