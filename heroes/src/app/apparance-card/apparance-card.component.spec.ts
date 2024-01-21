import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApparanceCardComponent } from './apparance-card.component';

describe('ApparanceCardComponent', () => {
  let component: ApparanceCardComponent;
  let fixture: ComponentFixture<ApparanceCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApparanceCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApparanceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
