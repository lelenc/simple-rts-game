import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameBossComponent } from './game-boss.component';

describe('GameBossComponent', () => {
  let component: GameBossComponent;
  let fixture: ComponentFixture<GameBossComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameBossComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameBossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
