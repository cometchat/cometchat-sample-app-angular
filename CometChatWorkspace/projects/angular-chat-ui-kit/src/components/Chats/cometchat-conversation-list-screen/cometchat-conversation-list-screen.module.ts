import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CometchatConversationListScreenComponent } from "./cometchat-conversation-list-screen/cometchat-conversation-list-screen.component";
import { CometchatConversationListModule } from "../cometchat-conversation-list/cometchat-conversation-list.module";
import { CometchatMessageListScreenModule } from "../../Messages/cometchat-message-list-screen/cometchat-message-list-screen.module";
import { CometchatUserDetailModule } from "../../Users/cometchat-user-detail/cometchat-user-detail.module";
import { CometchatMessageThreadModule } from "../../Messages/cometchat-message-thread/cometchat-message-thread.module";
import { CometchatImageViewModule } from "../../Messages/cometchat-image-view/cometchat-image-view.module";
import { CometchatGroupDetailModule } from "../../Groups/cometchat-group-detail/cometchat-group-detail.module";
import { CometchatCallAlertModule } from "../../Calls/cometchat-call-alert/cometchat-call-alert.module";
import { CometchatCallScreenModule } from "../../Calls/cometchat-call-screen/call-screen.module";
@NgModule({
  declarations: [CometchatConversationListScreenComponent],
  imports: [
    CommonModule,
    CometchatConversationListModule,
    CometchatMessageListScreenModule,
    CometchatUserDetailModule,
    CometchatGroupDetailModule,
    CometchatMessageThreadModule,
    CometchatImageViewModule,
    CometchatCallAlertModule,
    CometchatCallScreenModule,
    BrowserModule,
    BrowserAnimationsModule,
  ],
  exports: [CometchatConversationListScreenComponent],
})
export class CometchatConversationListScreenModule {}
