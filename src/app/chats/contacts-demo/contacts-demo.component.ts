import { Component, Input, OnInit } from '@angular/core';
import { CometChatTheme, CometChatThemeService } from '@cometchat/chat-uikit-angular';


@Component({
  selector: 'cometchat-contacts-demo',
  templateUrl: './contacts-demo.component.html',
  styleUrls: ['./contacts-demo.component.scss']
})
export class ContactsDemoComponent implements OnInit {
  constructor(private themeService:CometChatThemeService) {

  }

  ngOnInit(): void {

  }

}
