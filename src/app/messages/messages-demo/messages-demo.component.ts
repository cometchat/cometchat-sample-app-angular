import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CometChat } from '@cometchat-pro/chat';
import { CometChatServices } from 'src/app/app.service';
import { CometChatTheme, fontHelper } from '@cometchat-pro/angular-ui-kit';

@Component({
  selector: 'cometchat-messages-demo',
  templateUrl: './messages-demo.component.html',
  styleUrls: ['./messages-demo.component.scss']
})
export class MessagesDemoComponent implements OnInit {
  @Input() theme = new CometChatTheme({})
  public openMessages:boolean = false;
  public openMessageList:boolean = false;
  public openMessageHeader:boolean = false;
  public openMessageComposer:boolean = false;
  public image:string="https://data-us.cometchat.io/assets/images/avatars/captainamerica.png";
  public group!:CometChat.Group;
  withMessagesStyle:any={
    width: "100%",
    height: "100%",
    background: "transparent",
    borderRadius: "none",
    border: "none",
    messageTextColor: "rgba(20, 20, 20, 0.33)",
    messageTextFont: "700 22px Inter",
  }
  messageListStyle:any={
    width: "100%",
    height: "100%",
    background: "transparent",
    borderRadius: "none",
    border: "none",
    messageTextColor: "rgba(20, 20, 20, 0.33)",
    messageTextFont: "700 22px Inter",
  }
  messageComposerStyle:any={

  }

  constructor(private router: Router,private route: ActivatedRoute, private cometchatService:CometChatServices) { 
    this.theme = this.cometchatService.theme;
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
       if(this.router.getCurrentNavigation()?.extras?.state!["pageName"]){
         if(this.router.getCurrentNavigation()?.extras?.state!["pageName"] == "messages"){
           this.openMessages = true;
         }
         else    if(this.router.getCurrentNavigation()?.extras?.state!["pageName"] == "messageList"){
          this.openMessageList = true;
        }
        else    if(this.router.getCurrentNavigation()?.extras?.state!["pageName"] == "messageHeader"){
          this.openMessageHeader = true;
        }
        else    if(this.router.getCurrentNavigation()?.extras?.state!["pageName"] == "messageComposer"){
          this.openMessageComposer = true;
        }
       }
       else{
        window.history.back()
       }

      }
      else{
        window.history.back()
       }
      
    });
  }

  ngOnInit(): void {
    CometChat.getGroup("supergroup").then((group:CometChat.Group)=>{
      this.group = group

    })
    this.setTheme();
  }
  setTheme(){
    this.withMessagesStyle.background = this.theme.palette.getBackground();
    this.withMessagesStyle.messageTextFont = fontHelper(this.theme.typography.heading);
    this.withMessagesStyle.messageTextColor = this.theme.palette.getAccent400();
    this.messageListStyle.background = this.theme.palette.getBackground()
    this.messageComposerStyle.background = this.theme.palette.getAccent900()
    this.messageComposerStyle.inputBackground = this.theme.palette.getSecondary()
    this.messageComposerStyle.inputTextFont = fontHelper(this.theme.typography.subtitle1)
    this.messageComposerStyle.inputTextColor = this.theme.palette.getAccent900("dark")
  }

}
