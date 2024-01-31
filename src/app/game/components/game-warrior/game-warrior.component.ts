import { Component, Input } from '@angular/core';
import { Warrior } from '../../../modells/warrior';

@Component({
  selector: 'app-game-warrior',
  templateUrl: './game-warrior.component.html',
  styleUrl: './game-warrior.component.css'
})
export class GameWarriorComponent {
   @Input('warrior') warrior: Warrior;
}
