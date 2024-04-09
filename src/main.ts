import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { CometChat } from '@cometchat/chat-sdk-javascript';
import { AppConstants } from './AppConstants';
import { CometChatUIKit } from '@cometchat/chat-uikit-angular';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { UIKitSettingsBuilder } from '@cometchat/uikit-shared';
import { MetaInfo } from './MetaInfo';
if (environment.production) {
  enableProdMode();
}
const uiKitSettings = new UIKitSettingsBuilder()
  .setAppId(AppConstants.APP_ID)
  .setRegion(AppConstants.REGION)
  .setAuthKey(AppConstants.AUTH_KEY)
  .subscribePresenceForAllUsers()
  .build();


CometChatUIKit.init(uiKitSettings)!.then(() => {
  try { CometChat.setDemoMetaInfo(MetaInfo) } catch (err) { }
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));

})
