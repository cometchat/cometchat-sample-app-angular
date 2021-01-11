import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatConversationListItemComponent } from "./cometchat-conversation-list-item/cometchat-conversation-list-item.component";
import { CometchatBadgeCountModule } from "../../Shared/cometchat-badge-count/cometchat-badge-count.module";
import { CometchatAvatarModule } from "../../Shared/cometchat-avatar/cometchat-avatar.module";

@NgModule({
  declarations: [CometchatConversationListItemComponent],
  imports: [CommonModule, CometchatAvatarModule, CometchatBadgeCountModule],
  exports: [CometchatConversationListItemComponent],
})
export class CometchatConversationListItemModule {}
