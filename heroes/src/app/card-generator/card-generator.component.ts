import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
@Component({
  selector: 'app-card-generator',
  templateUrl: './card-generator.component.html',
  styleUrls: ['./card-generator.component.scss']
})
export class CardGeneratorComponent implements OnInit {

  userInput!: string;
  sparqlResults:any[]=[];


  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.userInput = '';
  }


  executeQuery(){

    // Define your SPARQL query
    const sparqlQuery = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX test: <http://ns.inria.fr/sparql-micro-service/api#>
    PREFIX : <http://projet.fr/perso_schema#>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    
    SELECT * WHERE {
      SERVICE <http://localhost/service/superheroeapi/getHero?name=${this.userInput}> {
        ?x :name ?heroName;
           :hasImage ?image;
           :appearence ?app.
           
        OPTIONAL { 
           ?app :race ?race. 
        }

        OPTIONAL { ?app :heightCm ?height }
        OPTIONAL { ?app :weightKg ?weight }
      }
      OPTIONAL{?r skos:prefLabel ?raceName.filter(?r = ?race)}
    }
    ORDER BY ?heroName
    

    `;

    const headers = new HttpHeaders({
      'Accept': 'application/sparql-results+json'
    });

    // Set up the HTTP params for the SPARQL query
    const params = new HttpParams()
      .set('query', sparqlQuery);

    // Define the SPARQL endpoint URL
    const sparqlEndpointUrl = `http://localhost:8081/sparql`;

    // Make an HTTP GET request to your SPARQL endpoint with the SPARQL query
    this.httpClient.get<any>(sparqlEndpointUrl, { headers, params })
      .subscribe(data => {
        this.sparqlResults = data.results.bindings;
        this.sparqlResults = this.sparqlResults.map(result => {
          return {
            heroName: result.heroName?.value,
            image: result.image?.value,
            name: result.name?.value ?? '',
            height: result.height?.value ?? '',
            weight: result.weight?.value ?? '',
            raceName: result.raceName?.value ??'',
          };
        });
      });
  }
}

