// src/app/models/hero.model.ts

export interface Hero {
    heroName: string;
    image: string;
    height?: number;
    weight?: number;
    raceName: string;
    alter: string[];
    alias: string[];
    hair: string[];
    eyes:string[];
    base:string;
    affiliation:string[];
    relatives:string[];
    name:string;
    occupations:string[];
    placeOfBirth:string;
  }
  
  export interface Film {
    title:string;
    actors:string[];
    director:string;
    entity:string;
    genre:string[];
    gross?:number;
    rating?:number;
    vote?:number;
    year?:number;
    characters?:Character[];
  }

  export interface Character{
    name:string;
    superHeroName:string;


  }
