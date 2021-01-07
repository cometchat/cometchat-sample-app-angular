import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CometchatUserListScreenComponent } from "./cometchat-user-list-screen/cometchat-user-list-screen.component";
import { CometchatUserListModule } from "../cometchat-user-list/cometchat-user-list.module";
import { CometchatMessageListScreenModule } from "../../Messages/cometchat-message-list-screen/cometchat-message-list-screen.module";
import { CometchatMessageThreadModule } from "../../Messages/cometchat-message-thread/cometchat-message-thread.module";
import { CometchatImageViewModule } from "../../Messages/cometchat-image-view/cometchat-image-view.module";
import { CometchatUserDetailModule } from "../cometchat-user-detail/cometchat-user-detail.module";
import { CometchatIncomingCallModule } from "../../Calls/cometchat-incoming-call/cometchat-incoming-call.module";
import { CometchatOutgoingCallModule } from "../../Calls/cometchat-outgoing-call/cometchat-outgoing-call.module";

@NgModule({
  declarations: [CometchatUserListScreenComponent],
  imports: [
    CommonModule,
    CometchatUserListModule,
    CometchatMessageListScreenModule,
    CometchatMessageThreadModule,
    CometchatImageViewModule,
    CometchatUserDetailModule,
    CometchatIncomingCallModule,
    CometchatOutgoingCallModule,
    BrowserModule,
    BrowserAnimationsModule,
  ],
  exports: [CometchatUserListScreenComponent],
})
export class CometchatUserListScreenModule {}
