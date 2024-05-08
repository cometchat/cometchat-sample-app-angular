import { Component, OnDestroy, OnInit } from '@angular/core';
import { CometChat } from '@cometchat/chat-sdk-javascript'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public listenerId = `app_component_listener${new Date().getTime()}`
  public loggedInUser: CometChat.User | null = null;
  ngOnInit(): void {
    this.attachLoginListener();
    CometChat.getLoggedInUser().then((user) => {
      this.loggedInUser = user;
    }).catch((err: CometChat.CometChatException) => {
      this.loggedInUser = null;
    })
  }
  ngOnDestroy(): void {
    this.removeListener();
  }
  attachLoginListener() {
    CometChat.addLoginListener(
      this.listenerId,
      new CometChat.LoginListener({
        loginSuccess: (e: CometChat.User) => {
          this.loggedInUser = e;
        },
        logoutSuccess: () => {
          this.loggedInUser = null;
        },
      })
    );
  }
  removeListener() {
    CometChat.removeLoginListener(this.listenerId);
  }
}
