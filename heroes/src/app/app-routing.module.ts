import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CardGeneratorComponent } from './card-generator/card-generator.component';
import { FilmSelectorComponent } from './film-selector/film-selector.component';


const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'page1', component: CardGeneratorComponent },
  { path: 'page2', component: FilmSelectorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
