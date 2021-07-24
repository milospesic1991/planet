import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanetDetailsComponent } from './planet-details/planet-details.component';
import { PlanetOverviewComponent } from './planet-overview/planet-overview.component';


const routes: Routes = [
  { path: '', redirectTo: '/planets-overview', pathMatch: 'full' },
  { path: 'planets-overview', component: PlanetOverviewComponent },
  { path: 'planet-details/:id', component: PlanetDetailsComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
