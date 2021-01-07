import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatMessageHeaderComponent } from "./cometchat-message-header/cometchat-message-header.component";
import { CometchatAvatarModule } from "../../Shared/cometchat-avatar/cometchat-avatar.module";
import { DatePipe } from "@angular/common";

@NgModule({
  declarations: [CometchatMessageHeaderComponent],
  imports: [CommonModule, CometchatAvatarModule],
  exports: [CometchatMessageHeaderComponent],
  providers: [DatePipe],
})
export class CometchatMessageHeaderModule {}
