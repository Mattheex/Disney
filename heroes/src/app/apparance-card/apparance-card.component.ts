import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../models/hero.model';

@Component({
  selector: 'app-apparance-card',
  templateUrl: './apparance-card.component.html',
  styleUrls: ['./apparance-card.component.scss']
})
export class ApparanceCardComponent implements OnInit {
  @Input() hero!:Hero;

  constructor() { }

  ngOnInit(): void {
  }

}
