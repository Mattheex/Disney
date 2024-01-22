import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardGeneratorComponent } from './card-generator/card-generator.component';
import { FilmPageComponent } from './film-page/film-page.component';
import { MainPageComponent } from './main-page/main-page.component';


const routes: Routes = [
  { path: 'page1', component: CardGeneratorComponent },
  { path: 'page2', component: FilmPageComponent },
  { path: 'home',component: MainPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
