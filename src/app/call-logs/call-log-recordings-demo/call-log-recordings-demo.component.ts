import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CallLog, CallUser } from '@cometchat/calls-sdk-javascript';
import { CometChat } from '@cometchat/chat-sdk-javascript';
import { CometChatUIKitCalls, States } from '@cometchat/chat-uikit-angular';

@Component({
  selector: 'call-log-recordings-demo',
  templateUrl: './call-log-recordings-demo.component.html',
  styleUrls: ['./call-log-recordings-demo.component.scss'],
})
export class CallLogRecordingsDemoComponent implements OnInit {
  constructor(private ref: ChangeDetectorRef) {}
  public loggedInUSer!: CometChat.User | null;
  group!: CometChat.Group;
  call: any;
  dummyCallObject: any;
  public state: States = States.loading;

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
    this.state = States.loading;
    this.ref.detectChanges();
    let callsRequest = new CometChatUIKitCalls.CallLogRequestBuilder()
      .setLimit(100)
      .setCallCategory('call')
      .setAuthToken(this.loggedInUSer?.getAuthToken())
      .build();

    callsRequest?.fetchNext().then((res: any) => {
      let filterList = res.filter((recording: any) => {
        return 'recordings' in recording;
      });
      this.call = filterList[0];

      if (!this.call) {
        this.call = this.getDummyCallObject();
      }
    });
  }

  getDummyCallObject() {
    const initiator = this.loggedInUSer;
    const receiver = CallUser.getUserFromJson({
      name: 'Kevin',
      avatar:
        'https://data-us.cometchat.io/assets/images/avatars/spiderman.png',
      uid: 'UID233',
    });
    const call = CallLog.callLogFromJson({
      initiator,
      receiver,
      participants: [
        {
          uid: this.loggedInUSer?.getUid(),
          avatar: this.loggedInUSer?.getAvatar(),
          name: this.loggedInUSer?.getName(),
          totalAudioMinutes: 120,
          totalDurationInMinutes: 120,
          totalVideoMinutes: 60,
        },
        {
          uid: 'UID233',
          avatar:
            'https://data-us.cometchat.io/assets/images/avatars/spiderman.png',
          name: 'Kevin',
          totalAudioMinutes: 120,
          totalDurationInMinutes: 120,
          totalVideoMinutes: 60,
        },
      ],
      recordings: [
        {
          startTime: 101,
          rid: 'Recordings',
          recordingUrl:
            'https://cdn-icons-png.flaticon.com/512/1752/1752772.png',
          endTime: 101,
          duration: 100,
        },
      ],
      totalDurationInMinutes: 0.6833333333333333,
      totalParticipants: 2,
      type: 'audio',
      mid: 'dcb170b0-99da-4beb-b65a8-86e48c89ef18',
      startedAt: 1697458341,
      endedAt: 1697458382,
      totalAudioMinutes: 0.6833333333333333,
      totalVideoMinutes: 0,
      totalDuration: '00:00:41',
      hasRecording: true,
      initiatedAt: 1697458328,
    });
    return call;
  }
}
