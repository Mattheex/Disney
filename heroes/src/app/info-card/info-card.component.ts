import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../models/hero.model';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss']
})
export class InfoCardComponent implements OnInit {
  @Input() hero!:Hero;

  constructor() { }

  ngOnInit(): void {
  }

}
