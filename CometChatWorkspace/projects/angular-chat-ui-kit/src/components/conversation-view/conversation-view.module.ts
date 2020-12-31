import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ConversationViewComponent } from "./conversation-view/conversation-view.component";
import { BadgeCountModule } from "../badge-count/badge-count.module";
import { CometchatAvatarModule } from "../cometchat-avatar/cometchat-avatar.module";

@NgModule({
  declarations: [ConversationViewComponent],
  imports: [CommonModule, CometchatAvatarModule, BadgeCountModule],
  exports: [ConversationViewComponent],
})
export class ConversationViewModule {}
