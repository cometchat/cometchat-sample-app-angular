import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CallScreenComponent } from "./call-screen/call-screen.component";
import { AvatarModule } from "../avatar/avatar.module";

@NgModule({
  declarations: [CallScreenComponent],
  imports: [CommonModule, AvatarModule],
  exports: [CallScreenComponent],
})
export class CallScreenModule {}
