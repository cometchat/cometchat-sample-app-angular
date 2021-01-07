import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CometchatGroupWithMessagesComponent } from "./cometchat-group-with-messages/cometchat-group-with-messages.component";
import { CometchatGroupListModule } from "../cometchat-group-list/cometchat-group-list.module";
import { CometchatMessagesModule } from "../../Messages/cometchat-messages/cometchat-messages.module";
import { CometchatMessageThreadModule } from "../../Messages/cometchat-message-thread/cometchat-message-thread.module";

import { CometchatImageViewerModule } from "../../Messages/cometchat-image-viewer/cometchat-image-viewer.module";
import { CometchatGroupDetailsModule } from "../cometchat-group-details/cometchat-group-details.module";
import { CometchatIncomingCallModule } from "../../Calls/cometchat-incoming-call/cometchat-incoming-call.module";
import { CometchatOutgoingCallModule } from "../../Calls/cometchat-outgoing-call/cometchat-outgoing-call.module";

@NgModule({
  declarations: [CometchatGroupWithMessagesComponent],
  imports: [
    CommonModule,
    CometchatGroupListModule,
    CometchatMessagesModule,
    CometchatMessageThreadModule,
    CometchatGroupDetailsModule,
    CometchatImageViewerModule,
    CometchatIncomingCallModule,
    CometchatOutgoingCallModule,
    BrowserModule,
    BrowserAnimationsModule,
  ],
  exports: [CometchatGroupWithMessagesComponent],
})
export class CometchatGroupWithMessagesModule {}
