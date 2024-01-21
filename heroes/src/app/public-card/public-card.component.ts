import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../models/hero.model';

@Component({
  selector: 'app-public-card',
  templateUrl: './public-card.component.html',
  styleUrls: ['./public-card.component.scss']
})
export class PublicCardComponent implements OnInit {
  @Input() hero!:Hero;

  constructor() { }

  ngOnInit(): void {
  }

}
