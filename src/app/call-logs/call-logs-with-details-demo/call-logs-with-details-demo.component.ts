import { Component, HostListener, Input, OnInit } from '@angular/core';
import { CometChatTheme, CometChatThemeService, fontHelper } from '@cometchat/chat-uikit-angular';


@Component({
  selector: 'call-logs-with-details-demo',
  templateUrl: './call-logs-with-details-demo.component.html',
  styleUrls: ['./call-logs-with-details-demo.component.scss']
})
export class CallLogsWithDetailsDemoComponent implements OnInit {

  withMessagesStyle:any={
    width: "100%",
    height: "100%",
    background: "transparent",
    borderRadius: "none",
    border: "none",
    messageTextColor: "rgba(20, 20, 20, 0.33)",
    messageTextFont: "700 22px Inter",
  }

  constructor(private themeService:CometChatThemeService) {


  }

  ngOnInit(): void {


    this.setTheme()
    this.onResize()
  }
  innerWidth!: number;
  isMobileView: boolean=false;
    /**
   * Checks when window size is changed in realtime
   */
     @HostListener("window:resize", [])
     onResize(): boolean {
       try {
         this.innerWidth = window.innerWidth;
         if (
           this.innerWidth >= 320 &&
           this.innerWidth <= 760
         ) {
           this.isMobileView = true;
         } else {
           this.isMobileView = false
         }
       } catch (error) {

       }
       return true;
     }
  setTheme(){
    this.withMessagesStyle.background = this.themeService.theme.palette.getBackground();
    this.withMessagesStyle.messageTextFont = fontHelper(this.themeService.theme.typography.heading);
    this.withMessagesStyle.messageTextColor = this.themeService.theme.palette.getAccent400();


  }

}
