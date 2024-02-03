import { Component, OnInit } from '@angular/core';
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
      console.log('warriors', warriors)
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

  selectWorker(worker: Worker): void {
    if (worker.isSelected) {
      this.gameStateService.selectUnit(null);
    } else {
      this.gameStateService.selectUnit(worker);
    }
  }

  //TODO
  selectBarrack(barrack: Barrack): void {
    this.selectedBarrack = barrack === this.selectedBarrack ? null : barrack;
    console.log('selectedBarrack', this.selectedBarrack)
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

  //Temp
  increaseGold(): void {
    this.gameStateService.increaseGold(200)
  }


}
