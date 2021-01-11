import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CometchatConversationListWithMessagesComponent } from "./cometchat-conversation-list-with-messages/cometchat-conversation-list-with-messages.component";
import { CometchatConversationListModule } from "../cometchat-conversation-list/cometchat-conversation-list.module";
import { CometchatMessagesModule } from "../../Messages/cometchat-messages/cometchat-messages.module";
import { CometchatUserDetailsModule } from "../../Users/cometchat-user-details/cometchat-user-details.module";
import { CometchatMessageThreadModule } from "../../Messages/cometchat-message-thread/cometchat-message-thread.module";
import { CometchatImageViewerModule } from "../../Messages/cometchat-image-viewer/cometchat-image-viewer.module";
import { CometchatGroupDetailsModule } from "../../Groups/cometchat-group-details/cometchat-group-details.module";
import { CometchatIncomingCallModule } from "../../Calls/cometchat-incoming-call/cometchat-incoming-call.module";
import { CometchatOutgoingCallModule } from "../../Calls/cometchat-outgoing-call/cometchat-outgoing-call.module";
@NgModule({
  declarations: [CometchatConversationListWithMessagesComponent],
  imports: [
    CommonModule,
    CometchatConversationListModule,
    CometchatMessagesModule,
    CometchatUserDetailsModule,
    CometchatGroupDetailsModule,
    CometchatMessageThreadModule,
    CometchatImageViewerModule,
    CometchatIncomingCallModule,
    CometchatOutgoingCallModule,
    BrowserModule,
    BrowserAnimationsModule,
  ],
  exports: [CometchatConversationListWithMessagesComponent],
})
export class CometchatConversationListWithMessagesModule {}
