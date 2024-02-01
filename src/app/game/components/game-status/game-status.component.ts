import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Barrack, Warrior, Worker } from '../../../modells/models';
import { AuthService } from '../../../services/auth.service';
import { GameStateService } from '../../../services/game-state.service';


@Component({
  selector: 'app-game-status',
  templateUrl: './game-status.component.html',
  styleUrl: './game-status.component.css'
})
export class GameStatusComponent implements OnInit {
  gold: number = 0;
  workers: Worker[];
  barracks: Barrack[];
  warriors: Warrior[];

  selectedWorker: Worker | null = null;
  selectedBarrack: Barrack | null = null;
  selectedWarrior: Warrior | null = null;

  constructor(private authService: AuthService, private router: Router, private gameStateService: GameStateService) { }
  
  ngOnInit(): void {
    this.gameStateService.getGold().subscribe((gold) => {
      console.log('gold', gold)
      this.gold = gold;
    });

    this.gameStateService.getWorkers().subscribe((workers) => {
      console.log('workers', workers)
      this.workers = workers
    });

    this.gameStateService.getBarracks().subscribe((barracks)=> {
      console.log('barracks', barracks)
      this.barracks = barracks;
    })

    this.gameStateService.getWarriors().subscribe((warriors) => {
      console.log('warriors', warriors)
      this.warriors = warriors
    });

  }

  get user(): string | null {
    return this.authService.getUsername();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  selectWorker(worker: Worker): void {
    this.selectedWorker = worker === this.selectedWorker ? null : worker;
    console.log('selectedWorker', this.selectedWorker)
  }

  selectBarrack(barrack: Barrack): void {
    this.selectedBarrack = barrack === this.selectedBarrack ? null : barrack;
    console.log('selectedBarrack', this.selectedBarrack)
  }

  selectWarrior(warrior: Warrior): void {
    this.selectedWarrior = warrior === this.selectedWarrior ? null : warrior;
    console.log('selectedWarrior', this.selectedWarrior)
  }

  buildBarrack(): void {
    if (this.selectedWorker) {
      this.gameStateService.buildBarrack(this.selectedWorker);
    }
  }

  makeWarrior(): void {
    if (this.selectedBarrack) {
      this.gameStateService.makeWarrior(this.selectedBarrack);
    }
  }

  attackMonster(): void {
    if (this.selectedWarrior) {
      this.gameStateService.warriorAttack(this.selectedWarrior);
    }
  }

  







  //Temp
  increaseGold(): void {
    this.gameStateService.increaseGold(200)
  }

  decreseGold(){
    this.gameStateService.decreaseGold(1)
  }

  addDamage(){
    this.gameStateService.attackMonster(1)
  }


}
