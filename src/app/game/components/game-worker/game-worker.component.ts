import { Component, Input, OnInit } from '@angular/core';
import { Worker } from '../../../modells/models';
import { GameStateService } from '../../../services/game-state.service';


@Component({
  selector: 'app-game-worker',
  templateUrl: './game-worker.component.html',
  styleUrl: './game-worker.component.css'
})
export class GameWorkerComponent implements OnInit {
   @Input('worker') worker: Worker;
   selected: boolean;
   busy: boolean;

   constructor(private gameStateService: GameStateService) {}

   ngOnInit(): void {
    /* this.gameStateService.getSelectedWorker().subscribe((worker) => {
        this.selected = this.worker == worker;
     });*/
   }

}
