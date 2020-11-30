import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ChangeDetectorRef,
} from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../utils/enums";

@Component({
  selector: "message-list",
  templateUrl: "./message-list.component.html",
  styleUrls: ["./message-list.component.css"],
})
export class MessageListComponent implements OnInit, OnDestroy, OnChanges {
  @Input() item = null;
  @Input() type = null;
  @Input() parentMessageId = null;
  @Input() widgetSettings = null;
  @Input() messages = [];
  @Input() reachedTopOfConversation = [];

  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();

  messagesRequest;
  limit = 50;
  decoratorMessage = "Loading...";
  times = 0;
  lastScrollTop = 0;
  loggedInUser;
  msgListenerId = "message_" + new Date().getTime();
  prevUser;

  categories = [
    enums.CATEGORY_MESSAGE,
    enums.CATEGORY_CUSTOM,
    enums.CATEGORY_ACTION,
    enums.CATEGORY_CALL,
  ];
  types = [
    enums.MESSAGE_TYPE_TEXT,
    enums.MESSAGE_TYPE_IMAGE,
    enums.MESSAGE_TYPE_VIDEO,
    enums.MESSAGE_TYPE_AUDIO,
    enums.MESSAGE_TYPE_FILE,
    enums.CUSTOM_TYPE_POLL,
    enums.CUSTOM_TYPE_STICKER,
    enums.ACTION_TYPE_GROUPMEMBER,
    enums.CALL_TYPE_AUDIO,
    enums.CALL_TYPE_VIDEO,
  ];

  constructor(private ref: ChangeDetectorRef) {
    setInterval(() => {
      //console.log("detectchange called");
      this.ref.detectChanges();
    }, 5000);
  }

  ngOnChanges(change: SimpleChanges) {
    console.log("Message List --> ngOnChanges -->  ", change);

    if (change["item"]) {
      //Removing Previous Conversation Listeners
      CometChat.removeMessageListener(this.msgListenerId);

      console.log(
        "Message List --> the User to which we were conversing changed ",
        change["item"]
      );

      this.msgListenerId = "message_" + new Date().getTime();

      this.createMessageRequestObjectAndGetMessages();

      // Attach MessageListeners for the new conversation
      this.addMessageEventListeners();
    }

    if (change["messages"]) {
      console.log("Message List --> the messages changed ");
      console.log(change["messages"]);
    }

    if (change["reachedTopOfConversation"]) {
      console.log("Message List --> reachedTopOfConversation ");
      console.log(change["reachedTopOfConversation"]);

      if (change["reachedTopOfConversation"].currentValue) {
        this.getMessages(false, false, true);
      }
    }
  }

  ngOnInit() {
    // console.log(`MessageList --> item `, this.item);
    // console.log(`MessageList --> UserType `, this.type);
    console.log(`MessageList --> Messages `, this.messages);

    this.createMessageRequestObjectAndGetMessages();

    // Attach MessageListeners Here
    this.addMessageEventListeners();
  }

  ngOnDestroy() {
    //Removing Message Listeners
    CometChat.removeMessageListener(this.msgListenerId);
  }

  /**
   * Creates a Message Request object ( holding the config , that is the two user involved in conversation ) and gets all the messages
   * @param
   */
  createMessageRequestObjectAndGetMessages() {
    if (this.parentMessageId) {
      this.messagesRequest = this.buildMessageRequestObject(
        this.widgetSettings,
        this.item,
        this.type,
        this.parentMessageId
      );
    } else {
      this.messagesRequest = this.buildMessageRequestObject(
        this.widgetSettings,
        this.item,
        this.type
      );
    }

    this.getMessages(false, true);
  }

  /**
   * Listener To Receive Messages in Real Time
   * @param
   */
  addMessageEventListeners() {
    CometChat.addMessageListener(
      this.msgListenerId,
      new CometChat.MessageListener({
        onTextMessageReceived: (textMessage) => {
          console.log("Text message received successfully", textMessage);
          this.messageUpdated(enums.TEXT_MESSAGE_RECEIVED, textMessage);
          // Handle text message
        },
        onMediaMessageReceived: (mediaMessage) => {
          console.log("Media message received successfully", mediaMessage);
          this.messageUpdated(enums.MEDIA_MESSAGE_RECEIVED, mediaMessage);

          // Handle media message
        },
        onCustomMessageReceived: (customMessage) => {
          console.log("Custom message received successfully", customMessage);
          // Handle custom message
        },
      })
    );
  }

  /**
   * This Build Message Request Configuration Object , that helps in getting messages of a particular conversation
   * @param
   */
  buildMessageRequestObject(
    widgetSettings = null,
    item = null,
    type = null,
    parentMessageId = null
  ) {
    let messageRequestBuilt;

    if (type === "user") {
      if (parentMessageId) {
        messageRequestBuilt = new CometChat.MessagesRequestBuilder()
          .setUID(item.uid)
          .setParentMessageId(parentMessageId)
          .setCategories(this.categories)
          .setTypes(this.types)
          .setLimit(this.limit)
          .build();
      } else {
        messageRequestBuilt = new CometChat.MessagesRequestBuilder()
          .setUID(item.uid)
          .setCategories(this.categories)
          .setTypes(this.types)
          .hideReplies(true)
          .setLimit(this.limit)
          .build();
      }
    } else if (type === "group") {
      if (parentMessageId) {
        messageRequestBuilt = new CometChat.MessagesRequestBuilder()
          .setGUID(item.guid)
          .setParentMessageId(parentMessageId)
          .setCategories(this.categories)
          .setTypes(this.types)
          .setLimit(this.limit)
          .build();
      } else {
        messageRequestBuilt = new CometChat.MessagesRequestBuilder()
          .setGUID(item.guid)
          .setCategories(this.categories)
          .setTypes(this.types)
          .hideReplies(true)
          .setLimit(this.limit)
          .build();
      }
    }

    return messageRequestBuilt;
  }

  /**
   * Gets Messages For a particular conversation bases on MessageRequestConfig
   * @param
   */
  getMessages(
    scrollToBottom = false,
    newConversation = false,
    scrollToTop = false
  ) {
    const actionMessages = [];

    let user = CometChat.getLoggedinUser().then(
      (user) => {
        // console.log("Inside MessageList user details:", { user });
        this.loggedInUser = user;

        this.messagesRequest.fetchPrevious().then(
          (messageList) => {
            // No Messages Found
            if (messageList.length === 0) {
              this.decoratorMessage = "No messages found";
            }

            messageList.forEach((message) => {
              if (
                message.category === "action" &&
                message.sender.uid === "app_system"
              ) {
                actionMessages.push(message);
              }

              //if the sender of the message is not the loggedin user, mark it as read.
              if (
                message.getSender().getUid() !== user.getUid() &&
                !message.getReadAt()
              ) {
                if (message.getReceiverType() === "user") {
                  CometChat.markAsRead(
                    message.getId().toString(),
                    message.getSender().getUid(),
                    message.getReceiverType()
                  );
                } else if (message.getReceiverType() === "group") {
                  CometChat.markAsRead(
                    message.getId().toString(),
                    message.getReceiverId(),
                    message.getReceiverType()
                  );
                }

                this.actionGenerated.emit({
                  type: "messageRead",
                  payLoad: message,
                });
              }
            });

            ++this.times;

            let actionGeneratedType = "messageFetched";
            if (scrollToBottom === true) {
              actionGeneratedType = "messageFetchedAgain";
            }

            if (scrollToTop) {
              actionGeneratedType = "olderMessagesFetched";
            }

            // Only called when the active user changes the the conversation , that is switches to some other person
            // to chat with
            if (newConversation) {
              actionGeneratedType = "newConversationOpened";
            }

            if (
              (this.times === 1 && actionMessages.length > 5) ||
              (this.times > 1 && actionMessages.length === 30)
            ) {
              this.actionGenerated.emit({
                type: "messageFetched",
                payLoad: messageList,
              });
              this.getMessages(true, false);
            } else {
              // Implement Scroll Logic from React
              // this.lastScrollTop = this.messagesEnd.scrollHeight;

              this.actionGenerated.emit({
                type: actionGeneratedType,
                payLoad: messageList,
              });
            }

            console.log("Message list fetched:", messageList);
            // Handle the list of messages
          },
          (error) => {
            console.log("Message fetching failed with error:", error);
          }
        );
      },
      (error) => {
        console.log("No Logged In User Found", { error });
      }
    );
  }

  messageUpdated(key = null, message = null, group = null, options = null) {
    //there are many cases to be filled Here

    switch (key) {
      case enums.TEXT_MESSAGE_RECEIVED:
      case enums.MEDIA_MESSAGE_RECEIVED:
        this.messageReceived(message);
        break;
    }
  }

  messageReceived(message) {
    console.log(` Message Type of the receiver `, message.getReceiverType());

    //new messages
    if (
      this.type === "group" &&
      message.getReceiverType() === "group" &&
      message.getReceiverId() === this.item.guid
    ) {
      if (!message.getReadAt()) {
        CometChat.markAsRead(
          message.getId().toString(),
          message.getReceiverId(),
          message.getReceiverType()
        );
      }

      this.actionGenerated.emit({
        type: "messageReceived",
        payLoad: [message],
      });
    } else if (
      this.type === "user" &&
      message.getReceiverType() === "user" &&
      message.getSender().uid === this.item.uid
    ) {
      if (!message.getReadAt()) {
        CometChat.markAsRead(
          message.getId().toString(),
          message.getSender().uid,
          message.getReceiverType()
        );
      }

      console.log(`received a message from a user `, this.item);

      // test this line .. if this updates the message or not
      // let dummy = [...this.messages];
      // this.messages = [...dummy, ...[message]];
      // console.log("after adding the received message ", this.messages);

      this.actionGenerated.emit({
        type: "messageReceived",
        payLoad: [message],
      });
    }
  }
}
