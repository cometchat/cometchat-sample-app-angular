import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CometChatCallLogDetails, CometChatCallLogHistory, CometChatCallLogParticipants, CometChatCallLogRecordings, CometChatCallLogs, CometChatCallLogsWithDetails, CometChatContacts, CometChatConversations, CometChatConversationsWithMessages } from '@cometchat/chat-uikit-angular';
import { SharedModule } from '../shared/shared.module';
import { CallLogsComponent } from './call-logs.component';

@NgModule({
  declarations: [
    CallLogsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    FormsModule,
    CometChatCallLogs,
    CometChatCallLogsWithDetails,
    CometChatCallLogDetails,
    CometChatCallLogParticipants,
    CometChatCallLogRecordings,
    CometChatCallLogHistory,

    SharedModule,
    
  ],
  providers: [],
  bootstrap: [CallLogsComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class CallLogsModule { }
