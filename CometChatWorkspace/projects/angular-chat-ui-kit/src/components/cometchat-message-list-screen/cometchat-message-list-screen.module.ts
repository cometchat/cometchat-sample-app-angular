import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatMessageListScreenComponent } from "./cometchat-message-list-screen/cometchat-message-list-screen.component";
import { MessageHeaderModule } from "../message-header/message-header.module";
import { MessageListModule } from "../message-list/message-list.module";
import { CometChatMessageComposerModule } from "../comet-chat-message-composer/comet-chat-message-composer.module";
import { LiveReactionModule } from "../live-reaction/live-reaction.module";

@NgModule({
  declarations: [CometchatMessageListScreenComponent],
  imports: [
    CommonModule,
    MessageHeaderModule,
    CometChatMessageComposerModule,
    MessageListModule,
    LiveReactionModule,
  ],
  exports: [CometchatMessageListScreenComponent],
})
export class CometchatMessageListScreenModule {}
