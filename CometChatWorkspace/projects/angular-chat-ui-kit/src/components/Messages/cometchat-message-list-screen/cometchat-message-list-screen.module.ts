import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatMessageListScreenComponent } from "./cometchat-message-list-screen/cometchat-message-list-screen.component";
import { CometchatMessageHeaderModule } from "../cometchat-message-header/cometchat-message-header.module";
import { CometchatMessageListModule } from "../cometchat-message-list/cometchat-message-list.module";
import { CometchatMessageComposerModule } from "../cometchat-message-composer/cometchat-message-composer.module";
import { CometchatLiveReactionsModule } from "../cometchat-live-reactions/cometchat-live-reactions.module";

@NgModule({
  declarations: [CometchatMessageListScreenComponent],
  imports: [
    CommonModule,
    CometchatMessageHeaderModule,
    CometchatMessageComposerModule,
    CometchatMessageListModule,
    CometchatLiveReactionsModule,
  ],
  exports: [CometchatMessageListScreenComponent],
})
export class CometchatMessageListScreenModule {}
