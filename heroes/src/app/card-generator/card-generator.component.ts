import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Hero } from '../models/hero.model';
import { SparqlService } from '../sparql.service';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-card-generator',
  templateUrl: './card-generator.component.html',
  styleUrls: ['./card-generator.component.scss']
})
export class CardGeneratorComponent implements OnInit {
  isLoading = false;
  userInput!: string;
  sparqlResults:any[]=[];
  uniqueHeroesArray!: Hero[];


  constructor(private sparqlService: SparqlService,private loaderService:LoaderService) {}

  ngOnInit() {
    this.userInput = '';
    this.loaderService.getLoaderState().subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }


  executeQuery(){
    this.sparqlService.getHero(this.userInput).subscribe(
      heroes => {
        this.uniqueHeroesArray = heroes;
        
    
        // Do something with the heroes data
      },)
    




  }
}

