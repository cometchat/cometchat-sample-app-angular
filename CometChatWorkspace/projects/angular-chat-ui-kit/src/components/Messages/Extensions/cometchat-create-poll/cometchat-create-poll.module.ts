import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatCreatePollComponent } from "./cometchat-create-poll/cometchat-create-poll.component";
import { CometchatBackdropModule } from "../../../Shared/cometchat-backdrop/cometchat-backdrop.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [CometchatCreatePollComponent],
  imports: [
    CommonModule,
    CometchatBackdropModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [CometchatCreatePollComponent],
})
export class CometchatCreatePollModule {}
