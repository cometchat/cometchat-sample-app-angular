import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { CometChatCallLogDetails, CometChatCallLogHistory, CometChatCallLogParticipants, CometChatCallLogRecordings, CometChatCallLogs, CometChatCallLogsWithDetails, CometChatContacts, CometChatConversations, CometChatConversationsWithMessages,  CometChatGroups, CometChatGroupsWithMessages, CometChatIncomingCall, CometChatMessageBubble, CometChatMessageComposer, CometChatMessageHeader, CometChatMessageInformation, CometChatMessageList, CometChatMessages, CometChatUsers, CometChatUsersWithMessages } from '@cometchat/chat-uikit-angular';
import { RouterModule } from '@angular/router';
import { MessagesDemoComponent } from './messages/messages-demo/messages-demo.component';
import { GroupsDemoComponent } from './groups/groups-demo/groups-demo.component';
import { UsersDemoComponent } from './users/users-demo/users-demo.component';
import { ConversationsWithMessagesDemoComponent } from './chats/conversations-with-messages-demo/conversations-with-messages-demo.component';
import { ConversationsDemoComponent } from './chats/conversations-demo/conversations-demo.component';
import { UsersWithMessagesDemoComponent } from './users/users-with-messages-demo/users-with-messages-demo.component';
import { GroupsWithMessagesDemoComponent } from './groups/groups-with-messages-demo/groups-with-messages-demo.component';
import { MessageListDemoComponent } from './messages/message-list-demo/message-list-demo.component';
import { MessageComposerDemoComponent } from './messages/message-composer-demo/message-composer-demo.component';
import { MessageHeaderDemoComponent } from './messages/message-header-demo/message-header-demo.component';
import { SharedModule } from './shared/shared.module';
import { MessagesModule } from './messages/messages.module';
import { UsersModule } from './users/users.module';
import { ChatsModule } from './chats/chats.module';
import { GroupsModule } from './groups/groups.module';
import { HomeModule } from './home/home.module';
import { CallsModule } from './calls/calls.module';
import { ContactsDemoComponent } from './chats/contacts-demo/contacts-demo.component';
import { MessageInformationDemoComponent } from './messages/message-information-demo/message-information-demo.component';
import { CallLogsModule } from './call-logs/call-logs.module';
import { CallLogsDemoComponent } from './call-logs/call-logs-demo/call-logs-demo.component';
import { CallLogsWithDetailsDemoComponent } from './call-logs/call-logs-with-details-demo/call-logs-with-details-demo.component';
import { CallLogDetailsDemoComponent } from './call-logs/call-log-details-demo/call-log-details-demo.component';
import { CallLogParticipantsDemoComponent } from './call-logs/call-log-participants-demo/call-log-participants-demo.component';
import { CallLogRecordingsDemoComponent } from './call-logs/call-log-recordings-demo/call-log-recordings-demo.component';
import { CallLogHistoryDemoComponent } from './call-logs/call-log-history-demo/call-log-history-demo.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    MessagesDemoComponent,
    GroupsDemoComponent,
    UsersDemoComponent,
    ConversationsWithMessagesDemoComponent,
    ConversationsDemoComponent,
    UsersWithMessagesDemoComponent,
    GroupsWithMessagesDemoComponent,
    MessageListDemoComponent,
    MessageComposerDemoComponent,
    MessageHeaderDemoComponent,
    ContactsDemoComponent,
    MessageInformationDemoComponent,
    CallLogsDemoComponent,
    CallLogsWithDetailsDemoComponent,
    CallLogDetailsDemoComponent,
    CallLogParticipantsDemoComponent,
    CallLogRecordingsDemoComponent,
    CallLogHistoryDemoComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CometChatConversationsWithMessages,
    CometChatConversations,
    HomeModule,
    CometChatUsersWithMessages,
    CometChatUsers,
    RouterModule,
    CometChatGroups,
    CometChatGroupsWithMessages,
    CometChatMessages,
    CometChatMessageList,
    CometChatMessageHeader,
    CometChatMessageComposer,
    SharedModule,
    MessagesModule,
    UsersModule,
    ChatsModule,
    GroupsModule,
    CallsModule,
    CallLogsModule,
    FormsModule,
    CometChatIncomingCall,
    CometChatContacts,
    CometChatMessageInformation,
    CometChatMessageBubble,
    CometChatCallLogs,
    CometChatCallLogsWithDetails,
    CometChatCallLogDetails,
    CometChatCallLogParticipants,
    CometChatCallLogRecordings,
    CometChatCallLogHistory
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
