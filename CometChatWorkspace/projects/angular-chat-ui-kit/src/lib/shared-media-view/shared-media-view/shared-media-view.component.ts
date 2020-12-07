import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../utils/enums";
import { CometChatManager } from "../../utils/controller";

@Component({
  selector: "shared-media-view",
  templateUrl: "./shared-media-view.component.html",
  styleUrls: ["./shared-media-view.component.css"],
})
export class SharedMediaViewComponent implements OnInit {
  @ViewChild("mediaContainer", null) mediaWindow: ElementRef;

  @Input() type = null;
  @Input() item = null;
  messageType: string = "image";
  messageList = [];
  SharedMediaManager;
  messageContainer;
  mediaMessageListenerId = "messages_" + new Date().getTime();
  mediaMessageRequest = null;
  loggedInUser;

  imageUrl: string;
  videoUrl: string =
    "https://data-eu.cometchat.io/2575989843b6228/media/1607353513_326798529_92ae4119d8f21fb2133f16a41deb7796.mov";
  docsUrl: string;

  scrollVariable = 0;

  scrolltoBottom: boolean;

  constructor() {}

  ngOnInit() {
    this.SharedMediaManager = this.mediaMessageRequestBuilder(
      this.item,
      this.type,
      this.messageType
    );
    this.getMessages(true);
    this.addMediaMessageEventListeners(this.messageUpdated);
  }

  /**
   * Removing Listeners
   */
  ngOnDestroy() {
    CometChat.removeMessageListener(this.mediaMessageListenerId);
  }

  mediaMessageRequestBuilder(item, type, messageType) {
    if (type === "user") {
      this.mediaMessageRequest = new CometChat.MessagesRequestBuilder()
        .setUID(item.uid)
        .setLimit(10)
        .setCategory("message")
        .setType(messageType)
        .build();
    } else {
      this.mediaMessageRequest = new CometChat.MessagesRequestBuilder()
        .setGUID(item.guid)
        .setLimit(10)
        .setCategory("message")
        .setType(messageType)
        .build();
    }
  }

  /**
   * Listener To Receive Media Messages in Real Time
   *  @param
   */
  addMediaMessageEventListeners(callback) {
    CometChat.addMessageListener(
      //not sure
      this.mediaMessageListenerId,
      //
      new CometChat.MessageListener({
        onMediaMessageReceived: (mediaMessage) => {
          callback(enums.MEDIA_MESSAGE_RECEIVED, mediaMessage);
        },
        onMessageDeleted: (deletedMessage) => {
          callback(enums.MESSAGE_DELETED, deletedMessage);
        },
      })
    );
  }

  /**
   * CallBack for listeners
   */
  messageUpdated(key, message) {
    switch (key) {
      case enums.MESSAGE_DELETED:
        this.messageDeleted(message);
        break;
      case enums.MEDIA_MESSAGE_RECEIVED:
        this.messageReceived(message);
        break;
      default:
        break;
    }
  }

  messageDeleted(deletedMessage) {
    const messageType = deletedMessage.data.type;
    if (
      this.type === "group" &&
      deletedMessage.getReceiverType() === "group" &&
      deletedMessage.getReceiver().guid === this.item.guid &&
      messageType === this.messageType
    ) {
      const messageList = [...this.messageList];
      const filteredMessages = messageList.filter(
        (message) => message.id !== deletedMessage.id
      );
      this.messageList = filteredMessages;
      this.scrolltoBottom = false;
    }
  }

  messageReceived(message) {
    const messageType = message.data.type;
    if (
      this.type === "group" &&
      message.getReceiverType() === "group" &&
      message.getReceiver().guid === this.item.guid &&
      messageType === this.messageType
    ) {
      let messages = [...this.messageList];
      messages = messages.concat(message);
      this.messageList = messages;
      this.scrolltoBottom = true;
    }
  }

  /**
   *   Gets the Media Message that are displayed
   * @param
   */
  getMessages(scrollToBottom = false) {
    new CometChatManager()
      .getLoggedInUser()
      .then((user) => {
        this.loggedInUser = user;

        this.fetchPreviousMessages()
          .then((messages) => {
            const messageList = [...messages, ...this.messageList];
            console.log("messagelist check  ", messageList);

            // this.messageList = messageList;
            // this.displayMessages();
            if (scrollToBottom) {
              this.messageList = messageList;
              this.scrollToBottom();
            } else {
              //No Need for below actions if there is nothing to prepend
              if (messages.length !== 0) {
                let prevScrollHeight = this.mediaWindow.nativeElement
                  .scrollHeight;

                this.messageList = messageList;

                // this.prependMessages(messages);

                setTimeout(() => {
                  this.scrollVariable =
                    this.mediaWindow.nativeElement.scrollHeight -
                    prevScrollHeight;
                }, 3000);
              }
            }
          })
          .catch((error) => {
            //TODO Handle the erros in contact list.
            console.error(
              "[SharedMediaView] getMessages fetchPrevious error",
              error
            );
          });
      })
      .catch((error) => {
        console.log(
          "[SharedMediaView] getMessages getLoggedInUser error",
          error
        );
      });
  }

  /**
   * Fetches All the previous Messages
   */
  fetchPreviousMessages() {
    return this.mediaMessageRequest.fetchPrevious();
  }

  scrollToBottom() {
    setTimeout(() => {
      console.log("scrolling shared-media");

      this.scrollVariable =
        this.mediaWindow.nativeElement.scrollHeight -
        this.mediaWindow.nativeElement.clientHeight;
    }, 1);

    // if (this.messageContainer) {
    //   this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
    // }
  }

  handleScroll(e) {
    const top = Math.round(e.currentTarget.scrollTop) === 0;
    if (top && this.messageList.length) {
      this.getMessages();
    }
  }

  /**
   * Sets the type of message i.e image,video or file
   * @param
   */
  mediaClickHandler(type) {
    this.messageList = [];
    this.messageType = type;
    this.SharedMediaManager = this.mediaMessageRequestBuilder(
      this.item,
      this.type,
      this.messageType
    );
    this.getMessages(true);
  }

  /**
   * Displays The Media Messages
   */
  displayMessages() {
    const messages = [...this.messageList];
    console.log("display messages ", messages);
    this.messageList = messages;
  }
}
