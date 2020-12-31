import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatMessageListScreenComponent } from "./cometchat-message-list-screen/cometchat-message-list-screen.component";
import { MessageHeaderModule } from "../message-header/message-header.module";
import { MessageListModule } from "../message-list/message-list.module";
import { CometchatMessageComposerModule } from "../cometchat-message-composer/cometchat-message-composer.module";
import { LiveReactionModule } from "../live-reaction/live-reaction.module";

@NgModule({
  declarations: [CometchatMessageListScreenComponent],
  imports: [
    CommonModule,
    MessageHeaderModule,
    CometchatMessageComposerModule,
    MessageListModule,
    LiveReactionModule,
  ],
  exports: [CometchatMessageListScreenComponent],
})
export class CometchatMessageListScreenModule {}
