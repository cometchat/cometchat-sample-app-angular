import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ChatsComponent } from './chats.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CometChatContacts, CometChatConversations, CometChatConversationsWithMessages } from '@cometchat/chat-uikit-angular';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  declarations: [
    ChatsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    FormsModule,
    CometChatConversations,
    CometChatConversationsWithMessages,
    SharedModule,
    CometChatContacts
  ],
  providers: [],
  bootstrap: [ChatsComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ChatsModule { }
