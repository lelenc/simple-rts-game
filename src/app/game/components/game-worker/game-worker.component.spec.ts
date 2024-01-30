import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameWorkerComponent } from './game-worker.component';

describe('GameWorkerComponent', () => {
  let component: GameWorkerComponent;
  let fixture: ComponentFixture<GameWorkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameWorkerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
