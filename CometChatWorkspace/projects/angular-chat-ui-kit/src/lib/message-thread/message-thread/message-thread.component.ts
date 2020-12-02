import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from "@angular/core";

@Component({
  selector: "message-thread",
  templateUrl: "./message-thread.component.html",
  styleUrls: ["./message-thread.component.css"],
})
export class MessageThreadComponent implements OnInit {
  @ViewChild("scrollMe", null) chatWindow: ElementRef;

  @Input() item = null;
  @Input() type = null;
  @Input() parentMessage = null;

  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();

  messageList = [];
  reachedTopOfConversation = false;
  scrollVariable = 0;

  constructor() {}

  ngOnInit() {}

  /**
   * Handles all the actions emitted by the child components that make the current component
   * @param Event action
   */
  actionHandler(action) {
    let messages = action.payLoad;

    console.log("MessageThread --> action generation is ", action);

    switch (action.type) {
      case "newConversationOpened": {
        this.setMessages(messages);

        break;
      }
      case "messageComposed": {
        this.appendMessage(messages);
        this.actionGenerated.emit({
          type: "messageComposed",
          payLoad: messages,
        });
        break;
      }
      case "customMessageReceived":
      case "messageReceived": {
        const message = messages[0];
        if (message.parentMessageId === this.parentMessage.id) {
          // const replyCount = this.state.replyCount + 1;
          // this.setState({ replyCount: replyCount });
          //this.smartReplyPreview(messages);
          this.appendMessage(messages);
        }
        break;
      }
      case "olderMessagesFetched": {
        this.reachedTopOfConversation = false;

        //No Need for below actions if there is nothing to prepend
        if (messages.length == 0) break;

        let prevScrollHeight = this.chatWindow.nativeElement.scrollHeight;

        this.prependMessages(messages);

        setTimeout(() => {
          this.scrollVariable =
            this.chatWindow.nativeElement.scrollHeight - prevScrollHeight;
        }, 1);

        break;
      }
    }
  }

  /**
   * Action is Generated to inform UserListScreen to close the thread window
   * @param
   */
  closeThread() {
    console.log("close thread clicked");
    this.actionGenerated.emit({ type: "closeThreadClicked", payLoad: null });
  }

  /**
   * set Messages Directly , coz new conversation is opened , hence no need to prepend or append
   * @param Any messages
   */
  setMessages(messages) {
    this.messageList = [...messages];

    this.scrollToBottomOfChatWindow();
  }

  /**
   * append Messages that are sent
   * @param Any messages
   */
  appendMessage = (messages) => {
    let dummy = [...this.messageList];

    this.messageList = [...dummy, ...messages];

    this.scrollToBottomOfChatWindow();
  };

  /**
   * prepend Fetched Messages
   * @param Any messages
   */
  prependMessages(messages) {
    this.messageList = [...messages, ...this.messageList];
  }

  handleScroll(e) {
    console.log(
      `Message Thread --> e.currentTarget.clientHeight `,
      e.currentTarget.clientHeight
    );

    const bottom =
      Math.round(e.currentTarget.scrollHeight - e.currentTarget.scrollTop) ===
      Math.round(e.currentTarget.clientHeight);

    const top = e.currentTarget.scrollTop === 0;

    if (top) {
      this.reachedTopOfConversation = top;
    }
  }

  scrollToBottomOfChatWindow() {
    setTimeout(() => {
      this.scrollVariable =
        this.chatWindow.nativeElement.scrollHeight -
        this.chatWindow.nativeElement.clientHeight;
    }, 1);
  }
}
