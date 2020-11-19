import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CometChatUserContactListComponent } from './comet-chat-user-contact-list/comet-chat-user-contact-list.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [CometChatUserContactListComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports : [CometChatUserContactListComponent]
})
export class CometChatUserContactListModule { }
