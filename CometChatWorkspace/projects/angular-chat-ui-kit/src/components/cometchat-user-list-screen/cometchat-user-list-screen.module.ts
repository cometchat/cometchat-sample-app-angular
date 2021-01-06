import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CometchatUserListScreenComponent } from "./cometchat-user-list-screen/cometchat-user-list-screen.component";
import { CometchatUserListModule } from "../cometchat-user-list/cometchat-user-list.module";
import { CometchatMessageListScreenModule } from "../cometchat-message-list-screen/cometchat-message-list-screen.module";
import { CometchatMessageThreadModule } from "../cometchat-message-thread/cometchat-message-thread.module";
import { CometchatImageViewModule } from "../cometchat-image-view/cometchat-image-view.module";
import { CometchatUserDetailModule } from "../cometchat-user-detail/cometchat-user-detail.module";
import { CometchatCallAlertModule } from "../cometchat-call-alert/cometchat-call-alert.module";
import { CometchatCallScreenModule } from "../cometchat-call-screen/call-screen.module";

@NgModule({
  declarations: [CometchatUserListScreenComponent],
  imports: [
    CommonModule,
    CometchatUserListModule,
    CometchatMessageListScreenModule,
    CometchatMessageThreadModule,
    CometchatImageViewModule,
    CometchatUserDetailModule,
    CometchatCallAlertModule,
    CometchatCallScreenModule,
    BrowserModule,
    BrowserAnimationsModule,
  ],
  exports: [CometchatUserListScreenComponent],
})
export class CometchatUserListScreenModule {}
