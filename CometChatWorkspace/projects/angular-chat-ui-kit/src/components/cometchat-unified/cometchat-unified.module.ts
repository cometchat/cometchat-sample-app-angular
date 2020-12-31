import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatUnifiedComponent } from "./cometchat-unified/cometchat-unified.component";
import { NavBarModule } from "../nav-bar/nav-bar.module";
import { CometchatMessageListScreenModule } from "../cometchat-message-list-screen/cometchat-message-list-screen.module";
import { CometchatUserDetailModule } from "../cometchat-user-detail/cometchat-user-detail.module";
import { CometchatMessageThreadModule } from "../cometchat-message-thread/cometchat-message-thread.module";
import { CometchatImageViewModule } from "../cometchat-image-view/cometchat-image-view.module";
import { CometchatGroupDetailModule } from "../cometchat-group-detail/cometchat-group-detail.module";
import { CometchatCallAlertModule } from "../cometchat-call-alert/cometchat-call-alert.module";
import { CometchatCallScreenModule } from "../cometchat-call-screen/call-screen.module";

@NgModule({
  declarations: [CometchatUnifiedComponent],
  imports: [
    CommonModule,
    NavBarModule,
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
