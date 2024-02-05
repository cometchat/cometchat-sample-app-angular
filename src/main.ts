import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { CometChat } from '@cometchat/chat-sdk-javascript';
import { COMETCHAT_CONSTANTS } from './CONSTS';
import { CometChatLocalize, CometChatUIKit, StickersExtension } from '@cometchat/chat-uikit-angular';
import { AppModule } from './app/app.module';

import { environment } from './environments/environment';
import { UIKitSettingsBuilder } from '@cometchat/uikit-shared';
import { MetaInfo } from './MetaInfo';

if (environment.production) {
  enableProdMode();
}
const uiKitSettings = new UIKitSettingsBuilder()
  .setAppId(COMETCHAT_CONSTANTS.APP_ID)
  .setRegion(COMETCHAT_CONSTANTS.REGION)
  .setAuthKey(COMETCHAT_CONSTANTS.AUTH_KEY)
  .subscribePresenceForFriends()
  .build();


CometChatUIKit.init(uiKitSettings)!.then(() => {
  try { CometChat.setDemoMetaInfo(MetaInfo) } catch (err) { }
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));

})
