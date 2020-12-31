import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatGroupListScreenComponent } from "./cometchat-group-list-screen/cometchat-group-list-screen.component";
import { CometchatGroupListModule } from "../cometchat-group-list/cometchat-group-list.module";
import { CometchatMessageListScreenModule } from "../cometchat-message-list-screen/cometchat-message-list-screen.module";
import { MessageThreadModule } from "../message-thread/message-thread.module";

import { ImageViewModule } from "../image-view/image-view.module";
import { CometchatGroupDetailModule } from "../cometchat-group-detail/cometchat-group-detail.module";
import { CometchatCallAlertModule } from "../cometchat-call-alert/cometchat-call-alert.module";
import { CometchatCallScreenModule } from "../cometchat-call-screen/call-screen.module";

@NgModule({
  declarations: [CometchatGroupListScreenComponent],
  imports: [
    CommonModule,
    CometchatGroupListModule,
    CometchatMessageListScreenModule,
    MessageThreadModule,
    CometchatGroupDetailModule,
    ImageViewModule,
    CometchatCallAlertModule,
    CometchatCallScreenModule,
  ],
  exports: [CometchatGroupListScreenComponent],
})
export class CometchatGroupListScreenModule {}
