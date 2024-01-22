import { Component, OnInit } from '@angular/core';
import { SparqlService } from '../sparql.service';
import { Film } from '../models/hero.model';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-film-selector',
  templateUrl: './film-selector.component.html',
  styleUrls: ['./film-selector.component.scss']
})
export class FilmSelectorComponent implements OnInit {
  sparqlQuery='';
  isLoading=false;
  sparqlResults:any[]=[];
  titles:string[]=[];
  selectedFilm: string="";
  film:Film|undefined;
  constructor(private sparqlService: SparqlService,private loaderService:LoaderService) { }

  ngOnInit(): void {
    this.executeQuery()
    this.loaderService.getLoaderState().subscribe((isLoading) => {
      this.isLoading = isLoading;
      console.log("hello")
    });
  }

  executeQuery(){
    this.sparqlQuery = `

    PREFIX schema:   <https://schema.org/> 

    SELECT * WHERE {
      ?x a schema:Movie;
       schema:name ?title.
    }
    `;

    this.fetchTitles();
  }

  fetchTitles(): void {
    this.sparqlService.getAnswer(this.sparqlQuery).subscribe(data => {
      this.sparqlResults = data.results.bindings;
      this.sparqlResults.forEach(data => this.titles.push(data.title.value))
    })
  }
  onFilmChange() {
    this.sparqlService.getFilm(this.selectedFilm).subscribe(
      film => {
        this.film = film;
    
        // Do something with the heroes data
      },) 

  }


}
