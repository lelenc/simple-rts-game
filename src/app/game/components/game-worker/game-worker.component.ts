import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-worker',
  templateUrl: './game-worker.component.html',
  styleUrl: './game-worker.component.css'
})
export class GameWorkerComponent {
  //TODO: Use modell
  @Input('worker') worker: number = 0;
}