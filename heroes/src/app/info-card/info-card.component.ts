import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Hero } from '../models/hero.model';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss']
})
export class InfoCardComponent implements OnInit {
  @Input() hero!:Hero;
  @Output() clickEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  handleFilmClick(film:string):void{
    this.clickEvent.emit(film);
  }

}
