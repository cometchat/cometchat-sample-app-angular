import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatNavBarComponent } from "./cometchat-nav-bar/cometchat-nav-bar.component";
import { CometchatUserInfoScreenModule } from "../cometchat-user-info-screen/cometchat-user-info-screen.module";
import { CometchatUserListModule } from "../cometchat-user-list/cometchat-user-list.module";
import { CometchatGroupListModule } from "../cometchat-group-list/cometchat-group-list.module";
import { CometchatConversationListModule } from "../cometchat-conversation-list/cometchat-conversation-list.module";

@NgModule({
  declarations: [CometchatNavBarComponent],
  imports: [
    CommonModule,
    CometchatUserInfoScreenModule,
    CometchatUserListModule,
    CometchatGroupListModule,
    CometchatConversationListModule,
  ],
  exports: [CometchatNavBarComponent],
})
export class CometchatNavBarModule {}
