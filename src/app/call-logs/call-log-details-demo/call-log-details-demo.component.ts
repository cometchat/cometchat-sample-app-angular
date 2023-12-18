import {
  Component,
  HostListener,
  Input,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CometChat } from '@cometchat/chat-sdk-javascript';
import {
  CometChatLocalize,
  CometChatTheme,
  CometChatThemeService,
  CometChatUIKitCalls,
  CometChatUIKitConstants,
  fontHelper,
} from '@cometchat/chat-uikit-angular';
import { ListItemStyle } from '@cometchat/uikit-elements';

@Component({
  selector: 'call-log-details-demo',
  templateUrl: './call-log-details-demo.component.html',
  styleUrls: ['./call-log-details-demo.component.scss'],
})
export class CallLogDetailsDemoComponent implements OnInit {
  public user!: CometChat.User | null;
  group!: CometChat.Group;
  public loggedInUSer!: CometChat.User | null;
  call: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private themeService: CometChatThemeService,
    private ref: ChangeDetectorRef
  ) {
    this.route.queryParams.subscribe((params) => {});
  }

  ngOnInit(): void {
    CometChat.getLoggedinUser()
      .then((user: CometChat.User | null) => {
        this.loggedInUSer = user;
        CometChat.getUser('superhero1')
          .then((user: CometChat.User) => {
            this.user = user;
          })
          .catch((error: CometChat.CometChatException) => {
            console.log(error);
          });
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
      this.ref.detectChanges();
    });
  }
}
