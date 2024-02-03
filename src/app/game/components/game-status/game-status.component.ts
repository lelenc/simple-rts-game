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
  @Input('testMode') testMode: boolean;
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
      this.gold = gold;
    });

    this.gameStateService.getWorkers().subscribe((workers) => {
      this.workers = workers

      const selectedWorkers = workers.filter(worker => worker.isSelected);
      this.selectedWorker = selectedWorkers.length > 0 ? selectedWorkers[0] : null;

    });

    this.gameStateService.getBarracks().subscribe((barracks) => {
      this.barracks = barracks;

      const selectedBarracks = barracks.filter(barrack => barrack.isSelected);
      this.selectedBarrack = selectedBarracks.length > 0 ? selectedBarracks[0] : null;

    })

    this.gameStateService.getWarriors().subscribe((warriors) => {
      this.warriors = warriors

      const selectedWarriors = warriors.filter(warrior => warrior.isSelected);
      this.selectedWarrior = selectedWarriors.length > 0 ? selectedWarriors[0] : null;

    });

  }

  get user(): string | null {
    return this.authService.getUsername();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  repeat(): void {
    this.gameStateService.initializeGame();
  }

  selectWorker(worker: Worker): void {
    if (worker.isSelected) {
      this.gameStateService.selectUnit(null);
    } else {
      this.gameStateService.selectUnit(worker);
    }
  }

  selectBarrack(barrack: Barrack): void {
    if (barrack.isSelected) {
      this.gameStateService.selectUnit(null);
    } else {
      this.gameStateService.selectUnit(barrack);
    }
  }

  selectWarrior(warrior: Warrior): void {
    if (warrior.isSelected) {
      this.gameStateService.selectUnit(null);
    } else {
      this.gameStateService.selectUnit(warrior);
    }
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

  //Test mode
  increaseGold(): void {
    this.gameStateService.increaseGold(200)
  }

  decreseGold() {
    this.gameStateService.decreaseGold(1)
  }

  addDamage() {
    this.gameStateService.attackMonster(1)
  }


}
