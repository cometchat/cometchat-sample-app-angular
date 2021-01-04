import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatConversationViewComponent } from "./cometchat-conversation-view/cometchat-conversation-view.component";
import { CometchatBadgeCountModule } from "../cometchat-badge-count/cometchat-badge-count.module";
import { CometchatAvatarModule } from "../cometchat-avatar/cometchat-avatar.module";

@NgModule({
  declarations: [CometchatConversationViewComponent],
  imports: [CommonModule, CometchatAvatarModule, CometchatBadgeCountModule],
  exports: [CometchatConversationViewComponent],
})
export class CometchatConversationViewModule {}
