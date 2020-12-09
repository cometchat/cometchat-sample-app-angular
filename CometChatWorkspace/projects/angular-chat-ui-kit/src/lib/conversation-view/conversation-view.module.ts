import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ConversationViewComponent } from "./conversation-view/conversation-view.component";
import { AvatarModule } from "../avatar/avatar.module";

@NgModule({
  declarations: [ConversationViewComponent],
  imports: [CommonModule, AvatarModule],
  exports: [ConversationViewComponent],
})
export class ConversationViewModule {}
