import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { CometchatUserInfoScreenModule } from "../cometchat-user-info-screen/cometchat-user-info-screen.module";
import { CometchatUserListModule } from "../cometchat-user-list/cometchat-user-list.module";
import { CometchatGroupListModule } from "../cometchat-group-list/cometchat-group-list.module";
import { CometchatConversationListModule } from "../cometchat-conversation-list/cometchat-conversation-list.module";

@NgModule({
  declarations: [NavBarComponent],
  imports: [
    CommonModule,
    CometchatUserInfoScreenModule,
    CometchatUserListModule,
    CometchatGroupListModule,
    CometchatConversationListModule,
  ],
  exports: [NavBarComponent],
})
export class NavBarModule {}
