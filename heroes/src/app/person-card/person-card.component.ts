import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../models/hero.model';

@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.scss']
})
export class PersonCardComponent implements OnInit {
  @Input() hero!: Hero;
  
  

  constructor() { }

  ngOnInit(): void {
    // Remove empty strings from alias array
    this.hero.alias = this.hero.alias.filter(alias => alias.trim() !== '');
    this.hero.alias = [...new Set(this.hero.alias)];

    // Remove empty strings from alter array
    this.hero.alter = this.hero.alter.filter(alter => alter.trim() !== '');
    this.hero.alter = [...new Set(this.hero.alter)];

    this.hero.affiliation = this.hero.affiliation.filter(affiliation => affiliation.trim() !== '');
    this.hero.affiliation = [...new Set(this.hero.affiliation)];

    this.hero.relatives = this.hero.relatives.filter(relatives => relatives.trim() !== '');
    this.hero.relatives = [...new Set(this.hero.relatives)];

    this.hero.eyes = [...new Set(this.hero.eyes)];

    this.hero.hair = [...new Set(this.hero.hair)];

  }
}
