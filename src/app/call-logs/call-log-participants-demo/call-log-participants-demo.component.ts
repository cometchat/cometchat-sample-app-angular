import { Component, OnInit } from '@angular/core';
import { CometChatUIKitCalls, States } from '@cometchat/chat-uikit-angular';
import { CometChat } from '@cometchat/chat-sdk-javascript';

@Component({
  selector: 'call-log-participants-demo',
  templateUrl: './call-log-participants-demo.component.html',
  styleUrls: ['./call-log-participants-demo.component.scss'],
})
export class CallLogParticipantsDemoComponent implements OnInit {
  public loggedInUSer!: CometChat.User | null;
  group!: CometChat.Group;
  call: any;
  constructor() {}

  ngOnInit(): void {
    CometChat.getLoggedinUser()
      .then((user: CometChat.User | null) => {
        this.loggedInUSer = user;
        this.fetchCallLog();
      })
      .catch((error: CometChat.CometChatException) => {
        console.log(error);
      });
  }

  fetchCallLog() {
    let callsRequest = new CometChatUIKitCalls.CallLogRequestBuilder()
      .setLimit(1)
      .setCallCategory('call')
      .setAuthToken(this.loggedInUSer?.getAuthToken())
      .build();

    callsRequest?.fetchNext().then((res: any) => {
      this.call = res[0];
    });
  }
}
