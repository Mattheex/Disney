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

@NgModule({
  declarations: [
    AppComponent,
    PersonCardComponent,
    CardGeneratorComponent,
    FilmSelectorComponent,
    HotbarComponent,
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
