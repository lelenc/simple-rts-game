import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-gold-status',
  templateUrl: './gold-status.component.html',
  styleUrl: './gold-status.component.css'
})
export class GoldStatusComponent {
  @Input('gold') gold: number = 0;
}
