import { NgModule } from "@angular/core";
import { AngularChatUiKitComponent } from "./angular-chat-ui-kit.component";
import { AvatarModule } from "./avatar/avatar.module";
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
