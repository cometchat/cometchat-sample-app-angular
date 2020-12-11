import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomePageComponent } from "./Components/home-page/home-page.component";
import { KitchenSinkAppComponent } from "./Components/kitchen-sink-app/kitchen-sink-app.component";
import { CometChatConversationListPageComponent } from "./Components/Pages/comet-chat-conversation-list-page/comet-chat-conversation-list-page.component";
import { CometChatConversationListScreenPageComponent } from "./Components/Pages/comet-chat-conversation-list-screen-page/comet-chat-conversation-list-screen-page.component";
import { CometChatMessageComposerPageComponent } from "./Components/Pages/comet-chat-message-composer-page/comet-chat-message-composer-page.component";
import { UserListPageComponent } from "./Components/user-list-page/user-list-page.component";
import { UserListScreenPageComponent } from "./Components/user-list-screen-page/user-list-screen-page.component";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path: "login",
    component: KitchenSinkAppComponent,
  },
  {
    path: "Home",
    component: HomePageComponent,
  },
  {
    path: "contact-list",
    component: UserListPageComponent,
  },
  {
    path: "conversations-list",
    component: CometChatConversationListPageComponent,
  },
  {
    path: "userListScreen",
    component: UserListScreenPageComponent,
  },
  {
    path: "contact-screen",
    component: UserListScreenPageComponent,
  },
  ,
  {
    path: "/conversation-screen",
    component: CometChatConversationListScreenPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
