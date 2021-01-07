import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { CometchatLiveReactionsComponent } from "./cometchat-live-reactions/cometchat-live-reactions.component";

@NgModule({
  declarations: [CometchatLiveReactionsComponent],
  imports: [CommonModule, BrowserModule, BrowserAnimationsModule],
  exports: [CometchatLiveReactionsComponent],
})
export class CometchatLiveReactionsModule {}
