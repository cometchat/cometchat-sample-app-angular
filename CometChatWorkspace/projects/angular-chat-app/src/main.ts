import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { CometChat } from '@cometchat-pro/chat';
import { COMETCHAT_CONSTANTS } from './CONSTS';

if (environment.production) {
  enableProdMode();
}

const appSetting = new CometChat.AppSettingsBuilder().setRegion(COMETCHAT_CONSTANTS.REGION).subscribePresenceForAllUsers().build();
CometChat.init(COMETCHAT_CONSTANTS.APP_ID, appSetting).then(() => {

  console.log('app is ready to work');

  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
}, (error) => {
  console.log('Error In Init', error);
});


