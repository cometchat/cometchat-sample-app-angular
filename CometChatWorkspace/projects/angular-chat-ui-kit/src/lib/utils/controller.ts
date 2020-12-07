import { CometChat } from "@cometchat-pro/chat";

export class CometChatManager {
  loggedInUser;
  isUserLoggedIn;

  getLoggedInUser() {
    let timerCounter = 10000;
    let timer = 0;

    return new Promise((resolve, reject) => {
      if (timerCounter === timer) reject(`timer reached ${timerCounter}`);

      if (this.loggedInUser) resolve(this.loggedInUser);

      if (!CometChat.isInitialized()) reject("CometChat not initialized");

      this.isUserLoggedIn = setInterval(() => {
        CometChat.getLoggedinUser().then(
          (user) => {
            this.loggedInUser = user;
            clearInterval(this.isUserLoggedIn);
            resolve(user);
          },
          (error) => {
            console.log(error);
            reject(error);
          }
        );

        timer += 100;
      }, 100);
    });
  }
}

export default CometChatManager;
