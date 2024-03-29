// sparql.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map, of, tap } from 'rxjs';
import { Character, Film, Hero } from './models/hero.model';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class SparqlService {
  private sparqlEndpoint = 'http://localhost:8081/sparql'; // Replace with your SPARQL endpoint URL

  constructor(private http: HttpClient,private loaderService:LoaderService) {}

  getAnswer(sparqlQuery: string): Observable<any> {
    const params = new HttpParams().set('query', sparqlQuery);
    const headers = new HttpHeaders({
      'Accept': 'application/sparql-results+json'
    });

    return this.http.get<any>(this.sparqlEndpoint, { params,headers });
  }

  getHero(userInput:string):Observable<Hero[]>{
    this.loaderService.showLoader();
    const sparqlQuery = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX test: <http://ns.inria.fr/sparql-micro-service/api#>
    PREFIX : <http://projet.fr/perso_schema/>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX film: <http://projet.fr/films_schema/>
    PREFIX schema: <https://schema.org/>
    PREFIX dbo: <http://dbpedia.org/ontology/>
    PREFIX dbp: <http://dbpedia.org/property/>

    
    SELECT * WHERE {
      BIND(URI(CONCAT("http://localhost/service/superheroeapi/getHero?name=","${userInput}")) AS ?service)
      SERVICE ?service{
        ?x schema:name ?heroName;
           schema:image ?image;
           :hasAppearance ?app;
           :secretIdentity ?secret;
           rdfs:seeAlso ?concept.

        OPTIONAL { ?app :eyes ?eyes}
        OPTIONAL { ?app :hair ?hair}
        OPTIONAL { ?app :race ?race.}
        OPTIONAL { ?app :heightCm ?height }
        OPTIONAL { ?app :weightKg ?weight }
        OPTIONAL { ?x schema:alternateName ?alias}
        OPTIONAL { ?x :alter ?alter}
        OPTIONAL { ?x :base ?base.}
        OPTIONAL { ?x :race ?race.}
        OPTIONAL { ?x :affiliation ?affiliation.}
        OPTIONAL { ?secret schema:name ?name.}
        OPTIONAL { ?secret :placeOfBirth ?place.}
        OPTIONAL { ?secret :hasOccupation ?occupations.}
        OPTIONAL { ?comic schema:character ?x;
                            schema:name ?apparition}
        
      }
      OPTIONAL{
      
        SERVICE <http://dbpedia.org/sparql>{
          
          ?dbPerso dbp:sortkey ?nameHeroDb ;
              dbp:subcat ?publisher.
          FILTER(LCASE(STR(?nameHeroDb)) = LCASE("${userInput}" ))
          OPTIONAL{?dbPerso dbp:partners ?relative.
          FILTER(!STRSTARTS(STR(?relative),"http://"))}
          

          }
      }
        
      
      
      OPTIONAL{?perso rdfs:seeAlso ?x; 
        film:presentinwork ?films.
        ?films schema:name ?film}
      OPTIONAL{?r skos:prefLabel ?raceName.filter(?r = ?race)}
      OPTIONAL{?e skos:prefLabel ?eyeColor.filter(?e = ?eyes)}
      OPTIONAL{?h skos:prefLabel ?hairColor.filter(?h = ?hair)}
      OPTIONAL{?o skos:prefLabel ?occupation.filter(?o = ?occupations)}
    }
    ORDER BY ?heroName
    

    `;
    

    return this.getAnswer(sparqlQuery).pipe(
      tap((data) => {
        // Hide loader when the request completes (successfully or with an error)
        this.loaderService.hideLoader();
      }),
      map(data => {
        const sparqlResults:{ [key: string]: { value: string } }[] = data.results.bindings;
        console.log(sparqlResults)

        const uniqueHeroes: { [key: string]: Hero } = {};

        sparqlResults.forEach(result => {
          const xValue = result['x'].value;

          if (!uniqueHeroes[xValue]) {
            uniqueHeroes[xValue] = {
              heroName: result['heroName']?.value ?? '',
              image: result['image']?.value ?? '',
              height: result['height']?.value ? parseInt(result['height'].value, 10) : undefined,
              weight: result['weight']?.value ? parseInt(result['weight'].value, 10) : undefined,
              raceName: result['raceName']?.value ?? '',
              base: result['base']?.value ?? '',
              placeOfBirth:result["place"]?.value ?? '',
              name:result["name"]?.value??'',
              publisher:result["publisher"]?.value??'',
              films:[],
              apparition:[],
              occupations:[],
              hair: [],
              eyes: [],
              alter: [],
              alias: [],
              relatives: [],
              affiliation: []
            };
          }

          // Add alias and alter to arrays
          uniqueHeroes[xValue].alias.push(result['alias']?.value ?? '');
          uniqueHeroes[xValue].alter.push(result['alter']?.value ?? '');
          uniqueHeroes[xValue].hair.push(result['hairColor']?.value ?? '');
          uniqueHeroes[xValue].eyes.push(result['eyeColor']?.value ?? '');
          uniqueHeroes[xValue].relatives.push(result['relative']?.value ?? '');
          uniqueHeroes[xValue].affiliation.push(result['affiliation']?.value ?? '');
          uniqueHeroes[xValue].occupations.push(result['occupation']?.value ?? '');
          uniqueHeroes[xValue].apparition.push(result['apparition']?.value ?? '');
          uniqueHeroes[xValue].films.push(result['film']?.value ?? '');
        });

        // Convert the uniqueHeroes object to an array
        const uniqueHeroesArray = Object.values(uniqueHeroes);

        return uniqueHeroesArray;
      })
    );
  }

  getFilm(input:string):Observable<Film|undefined>{
    this.loaderService.showLoader();
    const request =`
    PREFIX f_schema: <http://projet.fr/films_schema/> 
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX test: <http://ns.inria.fr/sparql-micro-service/api#>
    PREFIX : <http://projet.fr/perso_schema/>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX p_data:   <http://projet.fr/perso_data/> 
    PREFIX schema: <https://schema.org/>
    PREFIX dbo: <http://dbpedia.org/ontology/>
    prefix owl:      <http://www.w3.org/2002/07/owl#> 
    SELECT * WHERE {
      
      {?x a schema:Movie;
       schema:name ?title;
       f_schema:stars ?actors;
       schema:director ?directors;
       f_schema:entity ?entities;
       f_schema:genre ?genres;
       f_schema:gross ?gross;
       f_schema:rating ?rating;
       f_schema:vote ?vote;
       f_schema:year ?year.
       OPTIONAL {?x owl:sameAs ?link}
       OPTIONAL{
        ?x f_schema:castmember ?actorsCast.
        ?actorsCast schema:name ?actorCast.
       }
       OPTIONAL{
        ?x schema:character ?characters.
        ?characters rdfs:seeAlso ?also;
        schema:name ?id.
        {
          ?also schema:name ?name.
          FILTER(CONTAINS(?also,"/P"))
        }
        UNION
        {
          ?also schema:name ?super.
          FILTER(CONTAINS(?also,"/H"))
        }
       }
       ?actors schema:name ?actor.
       ?directors schema:name ?director.
       ?entities skos:prefLabel ?entity.
       ?genres skos:prefLabel ?genre.
       FILTER(?title = "${input}"@en)}
      
      
    }`
    console.log(request)
    
    return this.getAnswer(request).pipe(
      tap((data) => {
        // Hide loader when the request completes (successfully or with an error)
        this.loaderService.hideLoader();
      }),
      map(data => {
        console.log(request)
        const sparqlResults: { [key: string]: { value: string } }[] = data.results.bindings;
        console.log(sparqlResults)
        if (sparqlResults.length > 0) {
          const actors: string[] = sparqlResults
            .map(result => result['actor'].value)
            .concat(sparqlResults.map(result => result['actorCast']?.value || ''));
          
          const charactersMap: Map<string, Character> = new Map();

          sparqlResults
            .filter(result => result['id'])
            .forEach(result => {
              const id = result['id'].value;
              const name = result['name']?.value || '';
              const superHeroName = result['super']?.value || '';

              let character: Character;
              if (charactersMap.has(id)) {
                character = charactersMap.get(id)!;
              } else {
                character = { name: '', superHeroName: '' };
                charactersMap.set(id, character);
              }

              // Handle cases where you have either name or super in a result row
              if (name && !character.name) {
                character.name = name;
              }

              if (superHeroName && !character.superHeroName) {
                character.superHeroName = superHeroName;
              }
            });
      
            const characters: Character[] = Array.from(charactersMap.values());
      
      
      
      
    
    
          const film: Film = {
            title: sparqlResults[0]['title'].value,
            actors: actors, // Filter out empty strings
            director: sparqlResults[0]['director'].value,
            entity: sparqlResults[0]['entity'].value,
            link:sparqlResults[0]['link']?.value ?? '' ,
            genre: sparqlResults.map(result => result['genre'].value),
            gross: sparqlResults[0]['gross']?.value ? parseFloat(sparqlResults[0]['gross'].value.replace(',', '.')) : undefined,
            rating: sparqlResults[0]['rating']?.value ? parseFloat(sparqlResults[0]['rating'].value.replace(',', '.')) : undefined,
            vote: sparqlResults[0]['vote']?.value ? parseFloat(sparqlResults[0]['vote'].value.replace(',', '.')) : undefined,
            year: sparqlResults[0]['year']?.value ? parseInt(sparqlResults[0]['year'].value, 10) : undefined,
            characters: characters
          };
    
          return film;
        }
        return undefined; // Return undefined or handle the case where no film is found
      })
    );
    }

}
