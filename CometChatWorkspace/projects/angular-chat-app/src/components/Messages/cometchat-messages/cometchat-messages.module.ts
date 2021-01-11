import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatMessagesComponent } from "./cometchat-messages/cometchat-messages.component";
import { CometchatMessageHeaderModule } from "../cometchat-message-header/cometchat-message-header.module";
import { CometchatMessageListModule } from "../cometchat-message-list/cometchat-message-list.module";
import { CometchatMessageComposerModule } from "../cometchat-message-composer/cometchat-message-composer.module";
import { CometchatLiveReactionsModule } from "../cometchat-live-reactions/cometchat-live-reactions.module";

@NgModule({
  declarations: [CometchatMessagesComponent],
  imports: [
    CommonModule,
    CometchatMessageHeaderModule,
    CometchatMessageComposerModule,
    CometchatMessageListModule,
    CometchatLiveReactionsModule,
  ],
  exports: [CometchatMessagesComponent],
})
export class CometchatMessagesModule {}
