import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, map, Observable, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Building, Monster, Warrior, Worker, Barrack, Unit, UnitType } from '../modells/models';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  
  private workers: BehaviorSubject<Worker[]> = new BehaviorSubject<Worker[]>([]);
  private buildings: BehaviorSubject<Building[]> = new BehaviorSubject<Building[]>([]);
  private warriors: BehaviorSubject<Warrior[]> = new BehaviorSubject<Warrior[]>([]);
  private gold: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private monster: BehaviorSubject<Monster> = new BehaviorSubject<Monster>(null);

  private warriorIntervals: Map<string, Subscription> = new Map<string, Subscription>();

  constructor() {}

  initializeGame(): void {
    this.workers.next(this.createInitialWorkers());
    this.buildings.next([
      { type: 'Base', location: { row: 0, col: 0 }, constructionProgress: 100 },
      { type: 'GoldMine', location: { row: 0, col: 16 }, constructionProgress: 100 }
    ]);
    this.monster.next({ name: 'Endgame Boss', fullHP: 150, currentHP: 150, location: { row: 7, col: 16} });
  }

  private createInitialWorkers(): Worker[] {
    return [...Array(5)].map((_, i) => (
      { name: `Worker ${i + 1}`, status: 'Idle', isBusy: false, progress: 0, carriedGold: 0, location: { row: 1, col: i}, type: UnitType.Worker }
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
        location: { row: 7, col: 0 },
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
        location: {row: 0, col: 1},
        type: UnitType.Warrior
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
    console.log('warrior attack')
    if (this.monster.value.currentHP > 0 && !warrior.isBusy) {
      warrior.isBusy = true;
      warrior.status = "Attack monster"
      this.updateWarriors();

      if (!this.warriorIntervals.has(warrior.name)) {
        const attackInterval = interval(1000).pipe(
          takeUntil(new Subject<void>())
        );
    
        const subscription = attackInterval.subscribe(() => {
          if (this.monster.value.currentHP > 0 && this.isWarriorCloseToMonster(warrior)) {
            this.attackMonster(warrior.damage);
          } else {
            this.stopWarriorAttack(warrior);
          }
        });
    
        this.warriorIntervals.set(warrior.name, subscription);
      }
      
    }
  }

  startWarriorAttack(warrior: Warrior): void {
    warrior.isBusy = true;
    warrior.status = 'Attack monster';
  
    
  }
  
  stopWarriorAttack(warrior: Warrior): void {
    warrior.isBusy = false;
    warrior.status = 'Idle';
    this.updateWarriors();

    console.log('stop attack', warrior)
  
    if (this.warriorIntervals.has(warrior.name)) {
      this.warriorIntervals.get(warrior.name)?.unsubscribe();
      this.warriorIntervals.delete(warrior.name);
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
    selectUnit.location = {row, col};
    
    if (selectUnit.type == UnitType.Worker) {
      console.log("Worker")
      console.log(this.buildings.value)
      let building = this.buildings.value.filter((building) => building.location.col == selectUnit.location.col && building.location.row == selectUnit.location.row)
      console.log(building)
      if (building.length && building[0].type === 'GoldMine') {
        this.workerMineGold(selectUnit as Worker);
      }else if(building.length && building[0].type === 'Base'){
        this.workerDepositGold(selectUnit as Worker)
      }


    }


    if (selectUnit.type == UnitType.Warrior){
      if(this.isWarriorCloseToMonster(selectUnit as Warrior)){
        this.warriorAttack(selectUnit as Warrior);
      }
    }

  }

  isWarriorCloseToMonster(warrior: Warrior) {
   return  this.monster.value.location.col == warrior.location.col &&
        this.monster.value.location.row == warrior.location.row
  }

  
}
