import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GameRootComponent } from './components/game-root/game-root.component';
import { GamePlaygroundComponent } from './components/game-playground/game-playground.component';
import { GameStatusComponent } from './components/game-status/game-status.component';



@NgModule({
  declarations: [
    GameRootComponent,
    GamePlaygroundComponent,
    GameStatusComponent
  ],
  imports: [
    CommonModule
  ]
})
export class GameModule { }
