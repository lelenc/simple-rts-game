import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { GameStateService } from '../../../services/game-state.service';

@Component({
  selector: 'app-game-status',
  templateUrl: './game-status.component.html',
  styleUrl: './game-status.component.css'
})
export class GameStatusComponent implements OnInit {
  gold: number = 0;

  workers: any[];
  warriors: Array<number> = [];
  barracks: Array<number> = [];
 

  constructor(private authService: AuthService, private router: Router, private gameStateService: GameStateService) { }
  
  ngOnInit(): void {
    this.gameStateService.getGold().subscribe((gold) => {
      this.gold = gold;
    });

    this.workers = this.gameStateService.getWorkers();
  }

  get user(): string | null {
    return this.authService.getUsername();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  addBarrack(): void {
    this.gameStateService.decreaseGold(250)
  }

  addWarrior(): void {
    this.gameStateService.decreaseGold(200)
  }

  
  //Temp
  increaseGold(): void {
    this.gameStateService.increaseGold(1)
  }

  decreseGold(){
    this.gameStateService.decreaseGold(1)
  }

  addDamage(){
    this.gameStateService.attackMonster(1)
  }


}
