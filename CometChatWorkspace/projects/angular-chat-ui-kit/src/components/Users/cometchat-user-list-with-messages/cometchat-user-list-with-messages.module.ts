import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CometchatUserListWithMessagesComponent } from "./cometchat-user-list-with-messages/cometchat-user-list-with-messages.component";
import { CometchatUserListModule } from "../cometchat-user-list/cometchat-user-list.module";
import { CometchatMessageListScreenModule } from "../../Messages/cometchat-message-list-screen/cometchat-message-list-screen.module";
import { CometchatMessageThreadModule } from "../../Messages/cometchat-message-thread/cometchat-message-thread.module";
import { CometchatImageViewerModule } from "../../Messages/cometchat-image-viewer/cometchat-image-viewer.module";
import { CometchatUserDetailsModule } from "../cometchat-user-details/cometchat-user-details.module";
import { CometchatIncomingCallModule } from "../../Calls/cometchat-incoming-call/cometchat-incoming-call.module";
import { CometchatOutgoingCallModule } from "../../Calls/cometchat-outgoing-call/cometchat-outgoing-call.module";

@NgModule({
  declarations: [CometchatUserListWithMessagesComponent],
  imports: [
    CommonModule,
    CometchatUserListModule,
    CometchatMessageListScreenModule,
    CometchatMessageThreadModule,
    CometchatImageViewerModule,
    CometchatUserDetailsModule,
    CometchatIncomingCallModule,
    CometchatOutgoingCallModule,
    BrowserModule,
    BrowserAnimationsModule,
  ],
  exports: [CometchatUserListWithMessagesComponent],
})
export class CometchatUserListWithMessagesModule {}
