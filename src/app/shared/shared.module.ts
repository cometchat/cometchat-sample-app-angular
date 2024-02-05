import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CometChatConversations, CometChatConversationsWithMessages, CometChatDetails, CometChatGroups, CometChatGroupsWithMessages, CometChatMessageComposer, CometChatMessageHeader, CometChatMessageList, CometChatMessages, CometChatUsers, CometChatUsersWithMessages } from '@cometchat/chat-uikit-angular';

import { AudioBubbleDemoComponent } from './audio-bubble-demo/audio-bubble-demo.component';
import { AvatarDemoComponent } from './avatar-demo/avatar-demo.component';
import { BadgeComponent } from './badge-demo/badge-demo.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from '@angular/platform-browser';
import { CardBubbleDemoComponent } from './card-bubble-demo/card-bubble-demo.component';
import { DetailsDemoComponent } from './details-demo/details-demo.component';
import { FileBubbleDemoComponent } from './file-bubble-demo/file-bubble-demo.component';
import { FormBubbleDemoComponent } from './form-bubble-demo/form-bubble-demo.component';
import { FormsModule } from '@angular/forms';
import { ImageBubbleDemoComponent } from './image-bubble-demo/image-bubble-demo.component';
import { ListItemDemoComponent } from './list-item-demo/list-item-demo.component';
import { LocalizeDemoComponent } from './localize-demo/localize-demo.component';
import { ReceiptDemoComponent } from './message-receipt-demo/message-receipt-demo.component';
import { RouterModule } from '@angular/router';
import { SharedComponent } from './shared.component';
import { SoundManagerDemoComponent } from './sound-manager-demo/sound-manager-demo.component';
import { StatusIndicatorDemoComponent } from './status-indicator-demo/status-indicator-demo.component';
import { TextBubbleDemoComponent } from './text-bubble-demo/text-bubble-demo.component';
import { ThemeDemoComponent } from './theme-demo/theme-demo.component';
import { VideoBubbleDemoComponent } from './video-bubble-demo/video-bubble-demo.component';
import { SchedulerBubbleDemoComponent } from './scheduler-bubble-demo/scheduler-bubble-demo.component';

@NgModule({
  declarations: [
    SharedComponent,
    AvatarDemoComponent,
    BadgeComponent,
    LocalizeDemoComponent,
    ThemeDemoComponent,
    StatusIndicatorDemoComponent,
    ReceiptDemoComponent,
    ListItemDemoComponent,
    SoundManagerDemoComponent,
    TextBubbleDemoComponent,
    AudioBubbleDemoComponent,
    VideoBubbleDemoComponent,
    FileBubbleDemoComponent,
    ImageBubbleDemoComponent,
    DetailsDemoComponent,
    FormBubbleDemoComponent,
    CardBubbleDemoComponent,
    SchedulerBubbleDemoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    FormsModule,
    BrowserAnimationsModule,
    CometChatConversationsWithMessages,
    CometChatConversations,
    CometChatUsersWithMessages,
    CometChatUsers,
    RouterModule,
    CometChatGroups,
    CometChatGroupsWithMessages,
    CometChatMessages,
    CometChatMessageList,
    CometChatMessageHeader,
    CometChatMessageComposer,
    CometChatDetails,
  ],
  providers: [],
  bootstrap: [SharedComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
