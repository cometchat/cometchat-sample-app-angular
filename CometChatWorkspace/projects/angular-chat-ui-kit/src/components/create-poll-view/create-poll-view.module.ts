import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CreatePollViewComponent } from "./create-poll-view/create-poll-view.component";
import { CometchatBackdropModule } from "../cometchat-backdrop/cometchat-backdrop.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [CreatePollViewComponent],
  imports: [
    CommonModule,
    CometchatBackdropModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [CreatePollViewComponent],
})
export class CreatePollViewModule {}
