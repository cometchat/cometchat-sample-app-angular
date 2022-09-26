import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CometChatConversationsWithMessages, CometChatConversationsWithMessagesComponent } from '@cometchat-pro/angular-ui-kit';
import { ChatsDemoComponent } from './chats/chats-demo/chats-demo.component';
import { ChatsComponent } from './chats/chats.component';
import { GroupsDemoComponent } from './groups/groups-demo/groups-demo.component';
import { GroupsComponent } from './groups/groups.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MessagesDemoComponent } from './messages/messages-demo/messages-demo.component';
import { MessagesComponent } from './messages/messages.component';
import { SharedComponent } from './shared/shared.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UsersDemoComponent } from './users/users-demo/users-demo.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', redirectTo: "login", pathMatch: "full" },
  
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignUpComponent,
  },
  {
    path: 'Chats',
    component: ChatsComponent,
  },
  {
    path: 'Messages',
    component: MessagesComponent,
  },
  {
    path: 'Users',
    component: UsersComponent,
  },
  {
    path: 'Groups',
    component: GroupsComponent,
  },
  {
    path: 'Shared',
    component: SharedComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'conversation-with-messages',
    component: CometChatConversationsWithMessagesComponent,
  },
  {
    path: 'chats-demo',
    component: ChatsDemoComponent,
  },
  {
    path: 'groups-demo',
    component: GroupsDemoComponent,
  },
  {
    path: 'users-demo',
    component: UsersDemoComponent,
  },
  {
    path: 'messages-demo',
    component: MessagesDemoComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
