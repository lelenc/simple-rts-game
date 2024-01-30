import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-game-status',
  templateUrl: './game-status.component.html',
  styleUrl: './game-status.component.css'
})
export class GameStatusComponent {
  currentGold: number = 0;
  workers: Array<number> = [1, 2, 3];
  warriors: Array<number> = [1, 2, 3];
  barracks: Array<number> = [1, 2, 3];
  boss: number = 1

  constructor(private authService: AuthService, private router: Router) { }

  get user(): string | null {
    return this.authService.getUsername();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  addBarrack(): void {

  }

  addWarrior(): void {

  }


}
