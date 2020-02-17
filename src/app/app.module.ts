import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppHomeCompoenentComponent } from './app-home-compoenent/app-home-compoenent.component';
import { AppNavigationComponentComponent } from './app-navigation-component/app-navigation-component.component';
import { DemoComponent } from './demo/demo.component';
import { LoaderComponent } from './loader/loader.component';
import { CometchatAngularUiKitModule } from 'src/libs/cometchat-angular-ui-kit/src/lib/cometchat-angular-ui-kit.module';

@NgModule({
  declarations: [
    AppComponent, AppHomeCompoenentComponent, AppNavigationComponentComponent, DemoComponent, LoaderComponent
  ],
  imports: [
    BrowserModule, CommonModule, FormsModule, CometchatAngularUiKitModule, AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
