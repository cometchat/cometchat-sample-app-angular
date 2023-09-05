import { Component, HostListener, OnInit } from '@angular/core';
import {CometChatThemeService, fontHelper } from '@cometchat/chat-uikit-angular';
import { ListItemStyle } from '@cometchat/uikit-elements';
import '@cometchat/uikit-elements'
import { CometChat } from '@cometchat/chat-sdk-javascript';
import {TransferOwnershipStyle} from '@cometchat/uikit-shared'
@Component({
  selector: 'cometchat-transfer-ownership-demo',
  templateUrl: './transfer-ownership-demo.component.html',
  styleUrls: ['./transfer-ownership-demo.component.scss']
})
export class TransferOwnershipDemoComponent implements OnInit {

  group!:CometChat.Group;
  transferOwnershipStyle:TransferOwnershipStyle = {}



  constructor(private themeService:CometChatThemeService) {
    CometChat.getGroup("supergroup").then((group:CometChat.Group)=>{
      this.group = group

    })
    .catch((error:CometChat.CometChatException)=>{
      console.log(error)
    })

  }

  ngOnInit(): void {

this.setownershipStyle()
  }
  setownershipStyle(){
    this.transferOwnershipStyle = new TransferOwnershipStyle({
      background:this.themeService.theme.palette.getBackground(),
      border:`1px solid ${this.themeService.theme.palette.getAccent50()}`,
      MemberScopeTextFont: fontHelper(this.themeService.theme.typography.subtitle1),
      MemberScopeTextColor:this.themeService.theme.palette.getAccent600(),
      transferButtonTextFont :fontHelper(this.themeService.theme.typography.title2),
      transferButtonTextColor :this.themeService.theme.palette.getAccent("dark"),
      cancelButtonTextFont :fontHelper(this.themeService.theme.typography.title2),
      cancelButtonTextColor :this.themeService.theme.palette.getAccent("light"),
      width: "360px",
      height: "100%",
      borderRadius: "8px",
    })
  }


}
