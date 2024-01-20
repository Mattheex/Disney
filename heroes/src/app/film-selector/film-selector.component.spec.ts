import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmSelectorComponent } from './film-selector.component';

describe('FilmSelectorComponent', () => {
  let component: FilmSelectorComponent;
  let fixture: ComponentFixture<FilmSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilmSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
