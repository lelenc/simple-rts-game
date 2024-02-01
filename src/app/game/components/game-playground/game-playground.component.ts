import { Component, OnInit } from '@angular/core';
import { Building } from '../../../modells/building';
import { Monster } from '../../../modells/monster';
import { Warrior } from '../../../modells/warrior';
import { Worker } from '../../../modells/worker';
import { GameStateService } from '../../../services/game-state.service';

@Component({
  selector: 'app-game-playground',
  templateUrl: './game-playground.component.html',
  styleUrl: './game-playground.component.css'
})
export class GamePlaygroundComponent implements OnInit{
  rowSize: number = 10;
  colSize: number = 17;

  workers: Worker[];
  buildings: Building[];
  warriors: Warrior[];
  monster: Monster

  selectedWorker: Worker | null = null;

  constructor(private gameStateService: GameStateService) { }
  

  ngOnInit(): void {
    this.gameStateService.getWorkers().subscribe((workers) => {
      console.log('workers', workers)
      this.workers = workers
    });

    this.gameStateService.getBuildings().subscribe((buildings)=> {
      console.log('barracks', buildings)
      this.buildings = buildings;
    })

    this.gameStateService.getWarriors().subscribe((warriors) => {
      console.log('warriors', warriors)
      this.warriors = warriors
    });

    this.gameStateService.getMonster().subscribe((monster) => {
      console.log('monster', monster)
      this.monster = monster
    });
  }

  onMouseDownWorker(event: MouseEvent, worker: Worker): void {
    console.log('event down', event)
    if (event.button === 0) {
      this.selectWorker(worker);
    }else if(event.button === 2){
      //this.moveSelectedWorker();
    }
  }

  onMouseDown(event: MouseEvent, row : number, col: number){
    console.log('event', event, row, col)
    if (event.button === 2) {
      
    }
  }

  selectWorker(worker: Worker): void {
    this.selectedWorker = worker === this.selectedWorker ? null : worker;
    console.log('selectedWorker', this.selectedWorker)
  }

  moveSelectedWorker(row: number, col: number){
    if(this.selectedWorker){
      this.gameStateService.moveUnit(this.selectedWorker, row, col);
    }
  }


}
