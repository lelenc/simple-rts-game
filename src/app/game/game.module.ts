import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GameRootComponent } from './components/game-root/game-root.component';
import { GamePlaygroundComponent } from './components/game-playground/game-playground.component';
import { GameStatusComponent } from './components/game-status/game-status.component';
import { GameBossComponent } from './components/game-boss/game-boss.component';
import { GameWorkerComponent } from './components/game-worker/game-worker.component';
import { GameWarriorComponent } from './components/game-warrior/game-warrior.component';
import { GameBarrackComponent } from './components/game-barrack/game-barrack.component';
import { GoldStatusComponent } from './components/gold-status/gold-status.component';



@NgModule({
  declarations: [
    GameRootComponent,
    GamePlaygroundComponent,
    GameStatusComponent,
    GameBossComponent,
    GameWorkerComponent,
    GameWarriorComponent,
    GameBarrackComponent,
    GoldStatusComponent
  ],
  imports: [
    CommonModule
  ]
})
export class GameModule { }
