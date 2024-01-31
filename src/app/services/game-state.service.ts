import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Barrack, Building } from '../modells/building';
import { Monster } from '../modells/monster';
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
      { type: 'Base', location: { x: 0, y: 0 }, constructionProgress: 100 },
      { type: 'GoldMine', location: { x: 1, y: 1 }, constructionProgress: 100 }
    ]);
    this.monster.next({ name: 'Endgame Boss', fullHP: 150, currentHP: 150 });
  }

  private createInitialWorkers(): Worker[] {
    return [...Array(5)].map((_, i) => ({ name: `Worker ${i + 1}`, status: 'Idle', isBusy: false, progress: 0, carriedGold: 0 }));
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
      this.updateWorkers();

      const newBarrack: Barrack = {
        type: 'Barrack',
        location: { x: 100, y: 100 }, // Valós helyzet alapján frissítendő
        constructionProgress: 0,
        isBusy: true
      };
  
      this.decreaseGold(250);
      this.buildings.value.push(newBarrack);
      this.buildings.next(this.buildings.value);
  
      setTimeout(() => {
        newBarrack.constructionProgress = 100;
        newBarrack.isBusy = false;
        worker.isBusy = false;
        this.updateWorkers();
        this.buildings.next(this.buildings.value);
      }, 10000); // 10 másodperc építési idő
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
      this.buildings.next(this.buildings.value);

      const newWarrior: Warrior = {
        name: `Warrior ${this.warriors.value.length + 1}`,
        damage: 5,
        isBusy: false,
        status: 'Idle'
      };
  
      this.decreaseGold(200);
      this.warriors.value.push(newWarrior);
      this.warriors.next(this.warriors.value);
  
      setTimeout(() => {
        barrack.isBusy = false;
        this.buildings.next(this.buildings.value);
      }, 10000); // 10 másodperc kiképzési idő
    }
  }

  public warriorAttack(warrior: Warrior): void {
    if (this.monster.value.currentHP > 0 && !warrior.isBusy) {
      warrior.isBusy = true;
      this.updateWarriors();
      this.attackMonster(warrior.damage);
    }
  }

  public workerMineGold(worker: Worker): void {
    if (!worker.isBusy) {
      worker.isBusy = true;
      this.updateWorkers();
  
      setTimeout(() => {
        worker.isBusy = false;
        worker.carriedGold = 10; 
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

}
