import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatUnifiedComponent } from "./cometchat-unified/cometchat-unified.component";
import { CometchatNavBarModule } from "../../cometchat-nav-bar/cometchat-nav-bar.module";
import { CometchatMessageListScreenModule } from "../../Messages/cometchat-message-list-screen/cometchat-message-list-screen.module";
import { CometchatUserDetailModule } from "../../Users/cometchat-user-detail/cometchat-user-detail.module";
import { CometchatMessageThreadModule } from "../../Messages/cometchat-message-thread/cometchat-message-thread.module";
import { CometchatImageViewModule } from "../../Messages/cometchat-image-view/cometchat-image-view.module";
import { CometchatGroupDetailModule } from "../../Groups/cometchat-group-detail/cometchat-group-detail.module";
import { CometchatCallAlertModule } from "../../Calls/cometchat-call-alert/cometchat-call-alert.module";
import { CometchatCallScreenModule } from "../../Calls/cometchat-call-screen/call-screen.module";

@NgModule({
  declarations: [CometchatUnifiedComponent],
  imports: [
    CommonModule,
    CometchatNavBarModule,
    CometchatMessageListScreenModule,
    CometchatUserDetailModule,
    CometchatMessageThreadModule,
    CometchatImageViewModule,
    CometchatGroupDetailModule,
    CometchatCallAlertModule,
    CometchatCallScreenModule,
  ],
  exports: [CometchatUnifiedComponent],
})
export class CometchatUnifiedModule {}
