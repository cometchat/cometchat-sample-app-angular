import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatNavBarComponent } from "./cometchat-nav-bar/cometchat-nav-bar.component";
import { CometchatUserProfileModule } from "../cometchat-user-profile/cometchat-user-profile.module";
import { CometchatUserListModule } from "../../Users/cometchat-user-list/cometchat-user-list.module";
import { CometchatGroupListModule } from "../../Groups/cometchat-group-list/cometchat-group-list.module";
import { CometchatConversationListModule } from "../../Chats/cometchat-conversation-list/cometchat-conversation-list.module";
@NgModule({
  declarations: [CometchatNavBarComponent],
  imports: [
    CommonModule,
    CometchatUserProfileModule,
    CometchatUserListModule,
    CometchatGroupListModule,
    CometchatConversationListModule,
  ],
  exports: [CometchatNavBarComponent],
})
export class CometchatNavBarModule {}
