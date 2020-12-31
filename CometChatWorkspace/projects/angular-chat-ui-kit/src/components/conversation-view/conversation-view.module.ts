import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ConversationViewComponent } from "./conversation-view/conversation-view.component";
import { CometchatBadgeCountModule } from "../cometchat-badge-count/cometchat-badge-count.module";
import { CometchatAvatarModule } from "../cometchat-avatar/cometchat-avatar.module";

@NgModule({
  declarations: [ConversationViewComponent],
  imports: [CommonModule, CometchatAvatarModule, CometchatBadgeCountModule],
  exports: [ConversationViewComponent],
})
export class ConversationViewModule {}
