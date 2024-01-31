import { Component, OnInit } from '@angular/core';
import { GameStateService } from '../../../services/game-state.service';

@Component({
  selector: 'app-game-root',
  templateUrl: './game-root.component.html',
  styleUrl: './game-root.component.css'
})
export class GameRootComponent implements OnInit {
  constructor(private gameStateService: GameStateService) { }

  ngOnInit(): void {
    this.startGame();
  }

  startGame() {
    // Inicializáld az aranyat, épületeket, munkásokat stb.
    this.gameStateService.initializeGame();
  }

}
