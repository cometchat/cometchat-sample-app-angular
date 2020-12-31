import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatConversationListScreenComponent } from "./cometchat-conversation-list-screen/cometchat-conversation-list-screen.component";
import { CometchatConversationListModule } from "../cometchat-conversation-list/cometchat-conversation-list.module";
import { CometchatMessageListScreenModule } from "../cometchat-message-list-screen/cometchat-message-list-screen.module";
import { CometchatUserDetailModule } from "../cometchat-user-detail/cometchat-user-detail.module";
import { MessageThreadModule } from "../message-thread/message-thread.module";
import { CometchatImageViewModule } from "../cometchat-image-view/cometchat-image-view.module";
import { CometchatGroupDetailModule } from "../cometchat-group-detail/cometchat-group-detail.module";
import { CometchatCallAlertModule } from "../cometchat-call-alert/cometchat-call-alert.module";
import { CometchatCallScreenModule } from "../cometchat-call-screen/call-screen.module";

@NgModule({
  declarations: [CometchatConversationListScreenComponent],
  imports: [
    CommonModule,
    CometchatConversationListModule,
    CometchatMessageListScreenModule,
    CometchatUserDetailModule,
    CometchatGroupDetailModule,
    MessageThreadModule,
    CometchatImageViewModule,
    CometchatCallAlertModule,
    CometchatCallScreenModule,
  ],
  exports: [CometchatConversationListScreenComponent],
})
export class CometchatConversationListScreenModule {}
