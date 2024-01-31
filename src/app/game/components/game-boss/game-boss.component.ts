import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-boss',
  templateUrl: './game-boss.component.html',
  styleUrl: './game-boss.component.css'
})
export class GameBossComponent {
   //TODO: Use modell
   @Input('boss') boss: number = 0;
  
   currentHp: number = 150;
   fullHp: number = 150;


   getHpPercentage(): number {
    return (this.currentHp / this.fullHp) * 100;
  }

  getBackgroundColor(): string {
    const percentage = this.getHpPercentage();
    const color = this.lerpRGB({r: 255, g: 0, b: 0}, {r: 0, g: 255, b: 0}, percentage/100);
    return `rgb(${color.r}, ${color.g}, ${color.b})`;
  }

  lerpRGB(color1, color2, t) {
    let color: any = {};
    color.r = color1.r + ((color2.r - color1.r) * t);
    color.g = color1.g + ((color2.g - color1.g) * t);
    color.b = color1.b + ((color2.b - color1.b) * t);
    return color;
}

}
