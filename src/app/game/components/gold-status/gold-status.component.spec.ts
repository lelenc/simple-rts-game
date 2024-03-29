import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldStatusComponent } from './gold-status.component';

describe('GoldStatusComponent', () => {
  let component: GoldStatusComponent;
  let fixture: ComponentFixture<GoldStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GoldStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoldStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
