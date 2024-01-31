import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Building } from '../modells/building';
import { Monster } from '../modells/monster';
import { Worker } from '../modells/worker';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  private workers: Worker[] = [];
  private buildings: Building[] = [];
  
  private monster: Monster;
  private monsterSubject: BehaviorSubject<Monster>;

  private gold: number = 0;
  private goldSubject: BehaviorSubject<number> = new BehaviorSubject<number>(this.gold);

  constructor() { }

  initializeGame(): void {
    // Kezdeti munkások létrehozása
    this.workers = [
      { name: 'Worker 1', status: 'Idle', isBusy: false, progress: 0 },
      { name: 'Worker 2', status: 'Idle', isBusy: false, progress: 0},
      { name: 'Worker 3', status: 'Idle', isBusy: false, progress: 0 },
      { name: 'Worker 4', status: 'Idle', isBusy: false, progress: 0 },
      { name: 'Worker 5', status: 'Idle', isBusy: false, progress: 0 },
    ];
  
    this.buildings = [
      // Base épület példa
      { type: 'Base', location: { x: 0, y: 0 }, constructionProgress: 100 },
      // Bánya példa
      { type: 'GoldMine', location: { x: 1, y: 1 }, constructionProgress: 100 }
    ];
  
    // Kezdeti arany beállítása
    this.gold = 0;

    this.monster = {
      name: 'Monster',
      fullHP: 150, 
      currentHP: 150 
    };
    this.monsterSubject = new BehaviorSubject<Monster>(this.monster);
  }

  getWorkers(): Worker[] {
    return this.workers;
  }

  // Épületek műveletei
  addBuilding(building: Building): void {
    this.buildings.push(building);
  }

  getBuildings(): Building[] {
    return this.buildings;
  }

  // ------------ GOLD --------------
  
  getGold(): Observable<number> {
    return this.goldSubject.asObservable();
  }

  increaseGold(amount: number): void {
    this.gold += amount;
    this.goldSubject.next(this.gold);
  }

  decreaseGold(amount: number): boolean {
    if (this.gold >= amount) {
      this.gold -= amount;
      this.goldSubject.next(this.gold);
      return true; // Sikeresen csökkentettük az aranyat
    } else {
      // Nincs elegendő arany, kezeljük le ezt a helyzetet
      console.log('Nincs elegendő arany.');
      return false; // Sikertelen csökkentés, nincs elegendő arany
    }
  }

  // ------------------- MONSTER -----------------

  attackMonster(damage: number): void {
    if (this.monster.currentHP > 0) {
      this.monster.currentHP -= damage;
      // Ezen a ponton értesítsd az előfizetőket a szörny támadásáról
      this.monsterSubject.next(this.monster);
    }
  }

  getMonster(): Observable<Monster> {
    return this.monsterSubject.asObservable();
  }

}
