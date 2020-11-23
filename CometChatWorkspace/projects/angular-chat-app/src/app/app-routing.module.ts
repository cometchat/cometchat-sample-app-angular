import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { KitchenSinkAppComponent } from './Components/kitchen-sink-app/kitchen-sink-app.component';
import { UserListPageComponent } from './Components/user-list-page/user-list-page.component';


const routes: Routes = [
  {
    path: 'login',
    component: KitchenSinkAppComponent
  },
  {
    path: 'Home',
    component: HomePageComponent
  },
  {
    path: 'contact-list',
    component: UserListPageComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
