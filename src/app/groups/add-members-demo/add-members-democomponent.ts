import { Component, HostListener, OnInit } from '@angular/core';
import { GroupsStyle } from '@cometchat/uikit-shared';
import {CometChatThemeService, fontHelper } from '@cometchat/chat-uikit-angular';
import { ListItemStyle } from '@cometchat/uikit-elements';
import '@cometchat/uikit-elements'
@Component({
  selector: 'cometchat-add-members-demo',
  templateUrl: './add-members-demo.component.html',
  styleUrls: ['./add-members-demo.component.scss']
})
export class AddMembersDemoComponent implements OnInit {



  constructor(private themeService:CometChatThemeService) {


  }

  ngOnInit(): void {
  }



}
