import { Component, OnInit } from '@angular/core';
import { Building, Monster, Warrior, Worker } from '../../../modells/models';
import { GameStateService } from '../../../services/game-state.service';

@Component({
  selector: 'app-game-playground',
  templateUrl: './game-playground.component.html',
  styleUrl: './game-playground.component.css'
})
export class GamePlaygroundComponent implements OnInit{
  rowSize: number = 8;
  colSize: number = 17;

  workers: Worker[];
  buildings: Building[];
  warriors: Warrior[];
  monster: Monster

  selectedWorker: Worker | null = null;
  selectedWarrior: Warrior | null = null;

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
    if (event.button === 0) {
      this.selectWorker(worker);
    }
  }

  onMouseDownWarrior(event: MouseEvent, warrior: Warrior): void {
    if (event.button === 0) {
      this.selectWarrior(warrior);
    }
  }

  onMouseDown(event: MouseEvent, row : number, col: number){
    console.log('event', event, row, col)
    if (event.button === 2) {
      if (this.selectedWorker || this.selectWarrior) {
        this.moveSelectedUnit(row, col);
      }
    }
  }

  selectWorker(worker: Worker): void {
    this.selectedWorker = worker === this.selectedWorker ? null : worker;
    this.selectedWarrior = null;
    console.log('selectedWorker', this.selectedWorker)
  }

  selectWarrior(warrior: Warrior): void {
    this.selectedWarrior = warrior === this.selectedWarrior ? null : warrior;
    this.selectedWorker = null;
    console.log('selectedWarrior', this.selectedWarrior)
  }

  moveSelectedUnit(row: number, col: number){
    if(this.selectedWorker){
      this.gameStateService.moveUnit(this.selectedWorker, row, col);
    }
    if(this.selectedWarrior){
      this.gameStateService.moveUnit(this.selectedWarrior, row, col);
    }
  }


}
