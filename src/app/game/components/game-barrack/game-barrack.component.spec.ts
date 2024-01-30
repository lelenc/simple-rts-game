import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameBarrackComponent } from './game-barrack.component';

describe('GameBarrackComponent', () => {
  let component: GameBarrackComponent;
  let fixture: ComponentFixture<GameBarrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameBarrackComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameBarrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
