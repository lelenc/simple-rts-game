import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Barrack, Building } from '../modells/building';
import { Monster } from '../modells/monster';
import { Unit } from '../modells/unit';
import { Warrior } from '../modells/warrior';
import { Worker } from '../modells/worker';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  
  private workers: BehaviorSubject<Worker[]> = new BehaviorSubject<Worker[]>([]);
  private buildings: BehaviorSubject<Building[]> = new BehaviorSubject<Building[]>([]);
  private warriors: BehaviorSubject<Warrior[]> = new BehaviorSubject<Warrior[]>([]);
  private gold: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private monster: BehaviorSubject<Monster> = new BehaviorSubject<Monster>(null);

  constructor() {}

  initializeGame(): void {
    this.workers.next(this.createInitialWorkers());
    this.buildings.next([
      { type: 'Base', location: { row: 0, col: 0 }, constructionProgress: 100 },
      { type: 'GoldMine', location: { row: 0, col: 16 }, constructionProgress: 100 }
    ]);
    this.monster.next({ name: 'Endgame Boss', fullHP: 150, currentHP: 150, location: { row: 9, col: 16} });
  }

  private createInitialWorkers(): Worker[] {
    return [...Array(5)].map((_, i) => (
      { name: `Worker ${i + 1}`, status: 'Idle', isBusy: false, progress: 0, carriedGold: 0, location: { row: 1, col: i} }
      ));
  }

  // ------- GETTERS ---------------

  getWorkers(): Observable<Worker[]> {
    return this.workers.asObservable();
  }

  getBuildings(): Observable<Building[]> {
    return this.buildings.asObservable();
  }

  getBarracks(): Observable<Barrack[]> {
    return this.buildings.pipe(
      map(buildings => buildings.filter(b => b.type === 'Barrack') as Barrack[])
    );
  }

  getWarriors(): Observable<Warrior[]> {
    return this.warriors;
  }

  getGold(): Observable<number> {
    return this.gold.asObservable();
  }

  getMonster(): Observable<Monster> {
    return this.monster.asObservable();
  }

  // -------------- GOLD -----------------
  
  public decreaseGold(amount: number): void {
    if (this.gold.value >= amount) {
      this.gold.next(this.gold.value - amount);
    } 
  }

  public increaseGold(amount: number): void {
    this.gold.next(this.gold.value + amount);
  }

  // ------------ MONSTER ----------------

  public attackMonster(damage: number): void {
    if (this.monster.value.currentHP > 0) {
      this.monster.value.currentHP -= damage;
      this.monster.next(this.monster.value);
    }
  }

  // ---------------- BARRACK -------------

  buildBarrack(worker: Worker): void {
    if (this.gold.value >= 250 && !worker.isBusy) {
      
      worker.isBusy = true;
      worker.status = "Building Barrack"
      this.updateWorkers();

      const newBarrack: Barrack = {
        type: 'Barrack',
        location: { row: 9, col: 0 },
        constructionProgress: 0,
        isBusy: true,
        status: 'Under construction'
      };
  
      this.decreaseGold(250);
      this.buildings.value.push(newBarrack);
      this.buildings.next(this.buildings.value);
  
      setTimeout(() => {
        newBarrack.constructionProgress = 100;
        newBarrack.isBusy = false;
        newBarrack.status = 'Idle'
        worker.isBusy = false;
        worker.status = "Idle"
        this.updateWorkers();
        this.buildings.next(this.buildings.value);
      }, 10000);
    }
  }

  private updateWorkers(): void {
    this.workers.next(this.workers.value);
  }

  private updateWarriors(): void {
    this.warriors.next(this.warriors.value);
  }

  makeWarrior(barrack: Barrack): void {
    if (this.gold.value >= 200 && barrack.constructionProgress === 100 && !barrack.isBusy) {
      barrack.isBusy = true;
      barrack.status = "Making Warrior"

      this.buildings.next(this.buildings.value);

      const newWarrior: Warrior = {
        name: `Warrior ${this.warriors.value.length + 1}`,
        damage: 5,
        isBusy: true,
        status: 'Under construction',
        location: {row: 0, col: 1}
      };
  
      this.decreaseGold(200);
      this.warriors.value.push(newWarrior);
      this.warriors.next(this.warriors.value);
  
      setTimeout(() => {
        newWarrior.isBusy = false;
        newWarrior.status = 'Idle'
        barrack.isBusy = false;
        barrack.status = 'Idle'
        this.updateWarriors();
        this.buildings.next(this.buildings.value);
      }, 10000);
    }
  }

  public warriorAttack(warrior: Warrior): void {
    if (this.monster.value.currentHP > 0 && !warrior.isBusy) {
      warrior.isBusy = true;
      warrior.status = "Attack monster"
      this.updateWarriors();
      this.attackMonster(warrior.damage);
    }
  }

  public workerMineGold(worker: Worker): void {
    if (!worker.isBusy) {
      worker.isBusy = true;
      worker.status = "Mining"
      this.updateWorkers();
  
      setTimeout(() => {
        worker.isBusy = false;
        worker.carriedGold = 10; 
        worker.status = 'Idle'
        this.updateWorkers();
      }, 10000); // 10 másodperc bányászati idő
    }
  }
  
  public workerDepositGold(worker: Worker): void {
    if (worker.carriedGold > 0 && !worker.isBusy) {

      this.increaseGold(worker.carriedGold);
      worker.carriedGold = 0;
      this.updateWorkers();
    }
  }


  public moveUnit(selectUnit: Unit, row: number, col: number){

  }

  
}
