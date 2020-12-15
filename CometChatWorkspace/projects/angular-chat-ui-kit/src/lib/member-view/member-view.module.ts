import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MemberViewComponent } from "./member-view/member-view.component";

@NgModule({
  declarations: [MemberViewComponent],
  imports: [CommonModule],
  exports: [MemberViewComponent],
})
export class MemberViewModule {}
