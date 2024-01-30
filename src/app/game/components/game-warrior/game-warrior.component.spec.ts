import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameWarriorComponent } from './game-warrior.component';

describe('GameWarriorComponent', () => {
  let component: GameWarriorComponent;
  let fixture: ComponentFixture<GameWarriorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameWarriorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameWarriorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
