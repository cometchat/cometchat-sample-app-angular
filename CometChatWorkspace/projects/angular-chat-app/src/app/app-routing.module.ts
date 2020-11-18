import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { KitchenSinkAppComponent } from './Components/kitchen-sink-app/kitchen-sink-app.component';


const routes: Routes = [
  {
    path: 'login',
    component: KitchenSinkAppComponent
  },
  {
    path: 'Home',
    component: HomePageComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
