import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatCreatePollViewComponent } from "./cometchat-create-poll-view/cometchat-create-poll-view.component";
import { CometchatBackdropModule } from "../../../Shared/cometchat-backdrop/cometchat-backdrop.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [CometchatCreatePollViewComponent],
  imports: [
    CommonModule,
    CometchatBackdropModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [CometchatCreatePollViewComponent],
})
export class CometchatCreatePollViewModule {}
