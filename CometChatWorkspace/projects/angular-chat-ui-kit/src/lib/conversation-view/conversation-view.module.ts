import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ConversationViewComponent } from "./conversation-view/conversation-view.component";
import { AvatarModule } from "../avatar/avatar.module";
import { BadgeCountModule } from "../badge-count/badge-count.module";

@NgModule({
  declarations: [ConversationViewComponent],
  imports: [CommonModule, AvatarModule, BadgeCountModule],
  exports: [ConversationViewComponent],
})
export class ConversationViewModule {}
