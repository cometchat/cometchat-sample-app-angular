import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import {
  CometChatLocalize,
  CometChatTheme,
  CometChatThemeService,
  fontHelper,
  localize,
} from '@cometchat/chat-uikit-angular';

@Component({
  selector: 'call-logs',
  templateUrl: './call-logs.component.html',
  styleUrls: ['./call-logs.component.scss'],
})
export class CallLogsComponent implements OnInit {
  public localize: any = localize;
  public logoutIconURL: string = 'assets/logout.svg';

  public callLogsIconURL: string = 'assets/call-logs.svg';
  public callLogDetailsIconURL: string = 'assets/call-log-detail.svg';
  public callLogHistoryIconURL: string = 'assets/call-history.svg';
  public callLogRecordingsIconURL: string = 'assets/call-log-recording.svg';
  public callLogParticipantsIconURL: string = 'assets/call-participants.svg';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private themeService: CometChatThemeService
  ) {}
  ngOnInit(): void {}

  redirect(name: string) {
    this.router.navigate([name]);
  }
  // styles
  style: any = {
    sidebarStyle: () => {
      return {
        background: this.themeService.theme.palette.getSecondary(),
      };
    },
    headerTitleStyle: () => {
      return {
        font: fontHelper(this.themeService.theme.typography.heading),
        color: this.themeService.theme.palette.getAccent(),
      };
    },
    cardTitleStyle: () => {
      return {
        font: fontHelper(this.themeService.theme.typography.title2),
        color: this.themeService.theme.palette.getAccent(),
      };
    },
    cardStyle: () => {
      return {
        background: this.themeService.theme.palette.getBackground(),
        boxShadow: `${this.themeService.theme.palette.getAccent400()} 0px 0px 5px`,
      };
    },
    iconStyle: (icon: string) => {
      return {
        WebkitMask: `url(${icon}) center center no-repeat`,
        background: this.themeService.theme.palette.getAccent(),
        height: '28px',
        width: 'fit-content',
      };
    },
    cardDescriptionStyle: () => {
      return {
        font: fontHelper(this.themeService.theme.typography.subtitle2),
        color: this.themeService.theme.palette.getAccent600(),
      };
    },
    footerStyle: () => {
      return {
        font: fontHelper(this.themeService.theme.typography.subtitle2),
        color: this.themeService.theme.palette.getAccent500(),
      };
    },

    logoutIoncStyle: () => {
      return {
        WebkitMask: `url(${this.logoutIconURL}) center center no-repeat`,
        background: 'black',
        height: '24px',
        width: '24px',
      };
    },
  };
}
