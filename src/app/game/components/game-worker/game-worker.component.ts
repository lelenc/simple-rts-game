import { Component, Input } from '@angular/core';
import { Worker } from '../../../modells/models';


@Component({
  selector: 'app-game-worker',
  templateUrl: './game-worker.component.html',
  styleUrl: './game-worker.component.css'
})
export class GameWorkerComponent {
  @Input('worker') worker: Worker;

}
