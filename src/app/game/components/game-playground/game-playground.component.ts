import { Component, OnInit } from '@angular/core';
import { Building, Monster, Warrior, Worker } from '../../../modells/models';
import { GameStateService } from '../../../services/game-state.service';

@Component({
  selector: 'app-game-playground',
  templateUrl: './game-playground.component.html',
  styleUrl: './game-playground.component.css'
})
export class GamePlaygroundComponent implements OnInit {

  rowSize: number = 8;
  colSize: number = 17;

  workers: Worker[];
  buildings: Building[];
  warriors: Warrior[];
  monster: Monster

  selectedWorker: Worker | null = null;
  selectedBuilding: Building | null = null;
  selectedWarrior: Warrior | null = null;

  constructor(private gameStateService: GameStateService) { }


  ngOnInit(): void {
    this.gameStateService.getWorkers().subscribe((workers) => {
      this.workers = workers

      const selectedWorkers = workers.filter(worker => worker.isSelected);
      this.selectedWorker = selectedWorkers.length > 0 ? selectedWorkers[0] : null;

    });

    this.gameStateService.getBuildings().subscribe((buildings) => {
      this.buildings = buildings;

      const selectedBuildings = buildings.filter(building => building.isSelected);
      this.selectedBuilding = selectedBuildings.length > 0 ? selectedBuildings[0] : null;

    })

    this.gameStateService.getWarriors().subscribe((warriors) => {
      this.warriors = warriors

      const selectedWarriors = warriors.filter(warrior => warrior.isSelected);
      this.selectedWarrior = selectedWarriors.length > 0 ? selectedWarriors[0] : null;

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

  onMouseDownBuilding(event: MouseEvent, building: Building) {
    if (event.button === 0) {
      this.selectBuilding(building);
    }
  }
  
  onMouseDown(event: MouseEvent, row: number, col: number) {
    console.log('event', event, row, col)
    if (event.button === 2) {
      if (this.selectedWorker || this.selectedWarrior) {
        this.moveSelectedUnit(row, col);
      }
    }
  }

  selectWorker(worker: Worker): void {
    if (worker.isSelected) {
      this.gameStateService.selectUnit(null);
    } else {
      this.gameStateService.selectUnit(worker);
    }
  }

  selectBuilding(building: Building) {
    if (building.isSelected) {
      this.gameStateService.selectUnit(null);
    } else {
      this.gameStateService.selectUnit(building);
    }
  }


  selectWarrior(warrior: Warrior): void {
    if (warrior.isSelected) {
      this.gameStateService.selectUnit(null);
    } else {
      this.gameStateService.selectUnit(warrior);
    }
  }

  moveSelectedUnit(row: number, col: number) {
    console.log('move selected', row, col)
    if (this.selectedWorker && !this.selectedWorker.isBusy) {
      this.gameStateService.moveUnit(this.selectedWorker, row, col);
    }
    if (this.selectedWarrior && !this.selectedWarrior.isBusy) {
      this.gameStateService.moveUnit(this.selectedWarrior, row, col);
    }
  }


}
