import { NgModule } from "@angular/core";
import { AvatarModule } from "angular-chat-ui-kit/lib/avatar/avatar.module";
import { AngularChatUiKitComponent } from "./angular-chat-ui-kit.component";
import { CometChatUserContactListModule } from "./comet-chat-user-contact-list/comet-chat-user-contact-list.module";
import { CometChatUserContactListComponent } from "./comet-chat-user-contact-list/comet-chat-user-contact-list/comet-chat-user-contact-list.component";

@NgModule({
  declarations: [AngularChatUiKitComponent],
  imports: [CometChatUserContactListModule, AvatarModule],
  exports: [
    AngularChatUiKitComponent,
    CometChatUserContactListModule,
    AvatarModule,
  ],
})
export class AngularChatUiKitModule {}
