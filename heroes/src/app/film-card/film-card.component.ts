import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Character, Film, Hero } from '../models/hero.model';
import { SparqlService } from '../sparql.service';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.scss']
})
export class FilmCardComponent implements OnChanges, OnInit {
  
  @Input() film!: Film;
  perso:Hero|undefined;
  constructor(private sparqlService: SparqlService) {}
  ngOnInit(): void {
    
  }
  

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['film']  ) {
      this.film.actors = [...new Set(this.film.actors)];
      this.film.genre = [...new Set(this.film.genre)];
    }
  }

  handleCharacterClick(character: Character): void {
    this.sparqlService.getHero(character.superHeroName).subscribe(
      heroes => {
        this.perso =heroes.filter(hero=>hero.heroName === character.superHeroName)[0];
    
      },)
  }
}
