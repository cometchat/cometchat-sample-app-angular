import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatAppComponent } from "./cometchat-app/cometchat-app.component";
import { CometchatNavBarModule } from "../../cometchat-nav-bar/cometchat-nav-bar.module";
import { CometchatMessageListScreenModule } from "../../Messages/cometchat-message-list-screen/cometchat-message-list-screen.module";
import { CometchatUserDetailsModule } from "../../Users/cometchat-user-details/cometchat-user-details.module";
import { CometchatMessageThreadModule } from "../../Messages/cometchat-message-thread/cometchat-message-thread.module";
import { CometchatImageViewerModule } from "../../Messages/cometchat-image-viewer/cometchat-image-viewer.module";
import { CometchatGroupDetailsModule } from "../../Groups/cometchat-group-details/cometchat-group-details.module";
import { CometchatIncomingCallModule } from "../../Calls/cometchat-incoming-call/cometchat-incoming-call.module";
import { CometchatOutgoingCallModule } from "../../Calls/cometchat-outgoing-call/cometchat-outgoing-call.module";

@NgModule({
  declarations: [CometchatAppComponent],
  imports: [
    CommonModule,
    CometchatNavBarModule,
    CometchatMessageListScreenModule,
    CometchatUserDetailsModule,
    CometchatMessageThreadModule,
    CometchatImageViewerModule,
    CometchatGroupDetailsModule,
    CometchatIncomingCallModule,
    CometchatOutgoingCallModule,
  ],
  exports: [CometchatAppComponent],
})
export class CometchatAppModule {}
