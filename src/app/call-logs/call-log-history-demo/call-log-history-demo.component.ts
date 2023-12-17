import { Component, OnInit } from '@angular/core';
import { CometChat } from '@cometchat/chat-sdk-javascript';

@Component({
  selector: 'call-log-history-demo',
  templateUrl: './call-log-history-demo.component.html',
  styleUrls: ['./call-log-history-demo.component.scss'],
})
export class CallLogHistoryDemoComponent implements OnInit {
  constructor() {}
  public user!: CometChat.User | null;
  group!: CometChat.Group;

  ngOnInit(): void {
    CometChat.getUser('superhero1')
      .then((user: CometChat.User) => {
        this.user = user;
      })
      .catch((error: CometChat.CometChatException) => {
        console.log(error);
      });
  }
}
