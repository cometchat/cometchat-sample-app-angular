import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatCallScreenComponent } from "./cometchat-call-screen/cometchat-call-screen.component";
import { CometchatAvatarModule } from "../cometchat-avatar/cometchat-avatar.module";

@NgModule({
  declarations: [CometchatCallScreenComponent],
  imports: [CommonModule, CometchatAvatarModule],
  exports: [CometchatCallScreenComponent],
})
export class CometchatCallScreenModule {}
