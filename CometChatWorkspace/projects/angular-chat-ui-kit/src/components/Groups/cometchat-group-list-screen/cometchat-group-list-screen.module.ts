import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CometchatGroupListScreenComponent } from "./cometchat-group-list-screen/cometchat-group-list-screen.component";
import { CometchatGroupListModule } from "../cometchat-group-list/cometchat-group-list.module";
import { CometchatMessageListScreenModule } from "../../Messages/cometchat-message-list-screen/cometchat-message-list-screen.module";
import { CometchatMessageThreadModule } from "../../Messages/cometchat-message-thread/cometchat-message-thread.module";

import { CometchatImageViewerModule } from "../../Messages/cometchat-image-viewer/cometchat-image-viewer.module";
import { CometchatGroupDetailsModule } from "../cometchat-group-details/cometchat-group-details.module";
import { CometchatIncomingCallModule } from "../../Calls/cometchat-incoming-call/cometchat-incoming-call.module";
import { CometchatOutgoingCallModule } from "../../Calls/cometchat-outgoing-call/cometchat-outgoing-call.module";

@NgModule({
  declarations: [CometchatGroupListScreenComponent],
  imports: [
    CommonModule,
    CometchatGroupListModule,
    CometchatMessageListScreenModule,
    CometchatMessageThreadModule,
    CometchatGroupDetailsModule,
    CometchatImageViewerModule,
    CometchatIncomingCallModule,
    CometchatOutgoingCallModule,
    BrowserModule,
    BrowserAnimationsModule,
  ],
  exports: [CometchatGroupListScreenComponent],
})
export class CometchatGroupListScreenModule {}
