import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonCardComponent } from './person-card/person-card.component';
import { CardGeneratorComponent } from './card-generator/card-generator.component';
import { FormsModule } from '@angular/forms';
import { FilmSelectorComponent } from './film-selector/film-selector.component';
import { HotbarComponent } from './hotbar/hotbar.component';
import { FilmPageComponent } from './film-page/film-page.component';
import { FilmCardComponent } from './film-card/film-card.component';
import { ApparanceCardComponent } from './apparance-card/apparance-card.component';
import { HeroCardComponent } from './hero-card/hero-card.component';
import { PublicCardComponent } from './public-card/public-card.component';
import { InfoCardComponent } from './info-card/info-card.component';
import { MainPageComponent } from './main-page/main-page.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonCardComponent,
    CardGeneratorComponent,
    FilmSelectorComponent,
    HotbarComponent,
    FilmPageComponent,
    FilmCardComponent,
    ApparanceCardComponent,
    HeroCardComponent,
    PublicCardComponent,
    InfoCardComponent,
    MainPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
