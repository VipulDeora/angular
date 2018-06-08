import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormComponent} from './form/form.component';
import {ThankYouComponent} from './thank-you/thank-you.component';

const appRoutes: Routes = [
  {path: 'claims', component: FormComponent},
  {path: 'thank-you', component: ThankYouComponent},
  {path: '**', redirectTo: 'claims'}
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
