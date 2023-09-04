import { Component, Input, OnInit } from '@angular/core';
import { CometChatTheme, CometChatThemeService, TextBubbleStyle, fontHelper, localize } from '@cometchat/chat-uikit-angular';
import {CometChat} from '@cometchat/chat-sdk-javascript'
import {MessageInformationStyle} from '@cometchat/uikit-shared'
@Component({
  selector: 'cometchat-message-information-demo',
  templateUrl: './message-information-demo.component.html',
  styleUrls: ['./message-information-demo.component.scss']
})
export class MessageInformationDemoComponent implements OnInit {
public message!:any;
textStyle:TextBubbleStyle = {
  textFont:"300 13px Inter",
  textColor:"white"
}
messageinfoStyle:MessageInformationStyle = {}
  constructor(private themeService:CometChatThemeService) {
    this.message = {
      getReceiver:() => {
        return {
getAvatar:()=> "https://data-us.cometchat.io/assets/images/avatars/ironman.png",
getBlockedByMe:()=> false,
getDeactivatedAt:()=> 0,
getHasBlockedMe:()=>  false,
getLastActiveAt:()=>  1693306209,
getName:()=>  "Iron Man",
getRole:()=>  "default",
getStatus:()=>  "online",
getUid:()=>  "superhero2",
}
      },
      getSender:() => {
        return {
getAvatar:()=> "https://data-us.cometchat.io/assets/images/avatars/ironman.png",
getBlockedByMe:()=> false,
getDeactivatedAt:()=> 0,
getHasBlockedMe:()=>  false,
getLastActiveAt:()=>  1693306209,
getName:()=>  "Iron Man",
getRole:()=>  "default",
getStatus:()=>  "online",
getUid:()=>  "superhero1",
}
      },
      getText:()=> "Hello, how are you.",
      getSentAt:() => 1693322055785,
      getReadAt:() => 1693322055785,
      getDeliveredAt:() => 1693322055765,
      getReceiverType:()=> "user",
      getReceiverId:()=> "superhero2",
      getId:()=> 1234,
      getType:()=> "text",
      getCategory:()=> "message"
    }
}  
ngOnInit(): void {
  this.messageinfoStyle = {
    border:`1px solid ${this.themeService.theme.palette.getAccent400()}`
  }
  }
wrapperStyle(){
  return {
    background:this.themeService.theme.palette.getBackground(),
    height:"100%",
    width:"100%",
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  }
}
getMessageBubbleStyle(){
  return {
    background: this.themeService.theme.palette.getPrimary(),
    border: `none`,
    borderRadius: "12px",
  }
}

}