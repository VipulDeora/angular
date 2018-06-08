import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MapComponent} from './map/map.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'map', pathMatch: 'full'},
  {path: 'map', component: MapComponent},
  {path: '**', redirectTo: 'map'}
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
