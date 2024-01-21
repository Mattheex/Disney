import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CardGeneratorComponent } from './card-generator/card-generator.component';
import { FilmPageComponent } from './film-page/film-page.component';


const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'page1', component: CardGeneratorComponent },
  { path: 'page2', component: FilmPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
