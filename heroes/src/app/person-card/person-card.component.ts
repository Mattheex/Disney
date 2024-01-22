import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Film, Hero } from '../models/hero.model';
import { SparqlService } from '../sparql.service';

@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.scss']
})
export class PersonCardComponent implements OnInit,OnChanges {
  @Input() hero!: Hero;
  heroInfo=0;
  film:Film|undefined;
  
  

  constructor(private sparqlService:SparqlService) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['hero']  ){
      console.log(this.hero)
      this.hero.alias = this.hero.alias.filter(alias => alias.trim() !== '');
      this.hero.alias = [...new Set(this.hero.alias)];

      // Remove empty strings from alter array
      this.hero.alter = this.hero.alter.filter(alter => alter.trim() !== '');
      this.hero.alter = [...new Set(this.hero.alter)];

      this.hero.affiliation = this.hero.affiliation.filter(affiliation => affiliation.trim() !== '');
      this.hero.affiliation = [...new Set(this.hero.affiliation)];

      this.hero.relatives = this.hero.relatives.filter(relatives => relatives.trim() !== '');
      this.hero.relatives = [...new Set(this.hero.relatives)];

      this.hero.occupations = this.hero.occupations.filter(occupations => occupations.trim() !== '');
      this.hero.occupations = [...new Set(this.hero.occupations)];

      this.hero.apparition = this.hero.apparition.filter(apparition => apparition.trim() !== '');
      this.hero.apparition = [...new Set(this.hero.apparition)];

      this.hero.films = this.hero.films.filter(films => films.trim() !== '');
      this.hero.films = [...new Set(this.hero.films)];

      this.hero.eyes = [...new Set(this.hero.eyes)];

      this.hero.hair = [...new Set(this.hero.hair)];

      };
  }

  showInfo():void{
    this.heroInfo = (this.heroInfo+1)%4
  }

  ngOnInit(): void {
    // Remove empty strings from alias array
  }
  displayFilm(myFilm:string):void{
    this.sparqlService.getFilm(myFilm).subscribe(
      film => {
        this.film = film;
    
        // Do something with the heroes data
      },) 
  }
}
