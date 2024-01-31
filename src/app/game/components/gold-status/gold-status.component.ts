import { Component, Input, OnInit } from '@angular/core';
import { GameStateService } from '../../../services/game-state.service';

@Component({
  selector: 'app-gold-status',
  templateUrl: './gold-status.component.html',
  styleUrl: './gold-status.component.css'
})
export class GoldStatusComponent implements OnInit {
  gold: number = 0;

  constructor(private gameStateService: GameStateService) {}

  ngOnInit(): void {
    this.gameStateService.getGold().subscribe((gold) => {
      this.gold = gold;
    });
  }
}
