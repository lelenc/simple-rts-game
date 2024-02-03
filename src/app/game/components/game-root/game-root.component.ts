import { Component, OnInit } from '@angular/core';
import { GameStateService } from '../../../services/game-state.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-game-root',
  templateUrl: './game-root.component.html',
  styleUrl: './game-root.component.css'
})
export class GameRootComponent implements OnInit {
  constructor(private gameStateService: GameStateService, private authService: AuthService) { }
  
  showCongratulationsModal: boolean = false;
  testMode: boolean = false;

  ngOnInit(): void {
    this.testMode = this.authService.isTestModeEnabled();
    this.startGame();

    this.gameStateService.getMonster().subscribe((monster) => {
      this.showCongratulationsModal = monster.currentHP <= 0;
    })

  }

  startGame() {
    this.gameStateService.initializeGame();
  }

  closeModal() {
    this.showCongratulationsModal = false;
  }

}
