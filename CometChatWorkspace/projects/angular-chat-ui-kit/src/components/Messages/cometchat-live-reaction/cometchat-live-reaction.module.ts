import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { CometchatLiveReactionComponent } from "./cometchat-live-reaction/cometchat-live-reaction.component";

@NgModule({
  declarations: [CometchatLiveReactionComponent],
  imports: [CommonModule, BrowserModule, BrowserAnimationsModule],
  exports: [CometchatLiveReactionComponent],
})
export class CometchatLiveReactionModule {}
