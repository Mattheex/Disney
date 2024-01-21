import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Hero } from '../models/hero.model';
import { SparqlService } from '../sparql.service';

@Component({
  selector: 'app-card-generator',
  templateUrl: './card-generator.component.html',
  styleUrls: ['./card-generator.component.scss']
})
export class CardGeneratorComponent implements OnInit {

  userInput!: string;
  sparqlResults:any[]=[];
  uniqueHeroesArray!: Hero[];


  constructor(private sparqlService: SparqlService) {}

  ngOnInit() {
    this.userInput = '';
  }


  executeQuery(){
    this.sparqlService.getHero(this.userInput).subscribe(
      heroes => {
        this.uniqueHeroesArray = heroes;
    
        // Do something with the heroes data
      },)
    




  }
}

