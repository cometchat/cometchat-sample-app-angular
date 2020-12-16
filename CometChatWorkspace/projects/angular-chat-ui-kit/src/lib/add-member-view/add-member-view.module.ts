import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AddMemberViewComponent } from "./add-member-view/add-member-view.component";

@NgModule({
  declarations: [AddMemberViewComponent],
  imports: [CommonModule],
  exports: [AddMemberViewComponent],
})
export class AddMemberViewModule {}
