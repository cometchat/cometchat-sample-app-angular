
import { CometChatTheme, CometChatThemeService, fontHelper, localize } from '@cometchat/chat-uikit-angular';
import { Component, Input, OnInit } from '@angular/core';
import { CometChat } from '@cometchat/chat-sdk-javascript';
import { MessageComposerStyle } from '@cometchat/uikit-shared';

@Component({
  selector: 'cometchat-message-composer-demo',
  templateUrl: './message-composer-demo.component.html',
  styleUrls: ['./message-composer-demo.component.scss'],
})
export class MessageComposerDemoComponent implements OnInit {
  public user!: CometChat.User;
  messageComposerStyle: MessageComposerStyle = {
    height: '100%',
    width: '100%',
    borderRadius: '12px',
    maxInputHeight: '100px',
  };
  constructor(private themeService: CometChatThemeService) {
    CometChat.getUser('superhero5')
      .then((user: CometChat.User) => {
        this.user = user;
      })
      .catch((error: CometChat.CometChatException) => {
        console.log(error);
      });
  }

  ngOnInit(): void {
    this.setComposerStyle();
  }
  setComposerStyle() {
    let defaultStyle: MessageComposerStyle = new MessageComposerStyle({
      background: this.themeService.theme.palette.getAccent100(),
      border: `none`,
      height: '100%',
      width: '100%',
      borderRadius: '12px',
      attachIcontint: this.themeService.theme.palette.getAccent500(),
      sendIconTint: '#2fb5e9d1',
      emojiIconTint: this.themeService.theme.palette.getAccent500(),
      inputBackground: 'transparent',
      inputBorder: 'none',
      dividerTint: this.themeService.theme.palette.getAccent200(),
      textFont: fontHelper(this.themeService.theme.typography.subtitle1),
      textColor: this.themeService.theme.palette.getAccent(),
      emojiKeyboardTextFont:fontHelper(this.themeService.theme.typography.subtitle2),
      emojiKeyboardTextColor:this.themeService.theme.palette.getAccent400(),
      previewTitleFont:fontHelper(this.themeService.theme.typography.subtitle1),
      previewTitleColor:this.themeService.theme.palette.getAccent(),
      previewSubtitleFont:fontHelper(this.themeService.theme.typography.subtitle2),
      previewSubtitleColor:this.themeService.theme.palette.getAccent600(),
      closePreviewTint:this.themeService.theme.palette.getAccent500(),
      maxInputHeight:"100px"
    })
    this.messageComposerStyle = {...defaultStyle,...this.messageComposerStyle}
  }
  wrapperStyle = () => {
    return {
      width: '100%',
      height: '100%',
      background: this.themeService.theme.palette.getBackground(),
    };
  };
}
