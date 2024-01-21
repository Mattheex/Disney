import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicCardComponent } from './public-card.component';

describe('PublicCardComponent', () => {
  let component: PublicCardComponent;
  let fixture: ComponentFixture<PublicCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
