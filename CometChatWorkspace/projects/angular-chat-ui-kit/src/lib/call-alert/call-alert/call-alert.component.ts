import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import * as enums from "../../utils/enums";
import { CometChat } from "@cometchat-pro/chat";
import { CometChatManager } from "../../utils/controller";

@Component({
  selector: "call-alert",
  templateUrl: "./call-alert.component.html",
  styleUrls: ["./call-alert.component.css"],
})
export class CallAlertComponent implements OnInit {
  incomingCall = null;
  callInProgress = null;
  callListenerId = "incoming_call_" + new Date().getTime();
  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();

  constructor() {}
  ngOnDestroy() {
    this.removeListeners();
  }

  ngOnInit() {
    this.attachListeners();
  }

  attachListeners() {
    CometChat.addCallListener(
      this.callListenerId,
      new CometChat.CallListener({
        onIncomingCallReceived: (call) => {
          this.callScreenUpdated(enums.INCOMING_CALL_RECEIVED, call);
        },
        onIncomingCallCancelled: (call) => {
          this.callScreenUpdated(enums.INCOMING_CALL_CANCELLED, call);
        },
      })
    );
  }

  removeListeners() {
    CometChat.removeCallListener(this.callListenerId);
  }

  callScreenUpdated(key, call) {
    switch (key) {
      case enums.INCOMING_CALL_RECEIVED: {
        //occurs at the callee end
        console.log("recieved call inside callscreen updated function");
        this.incomingCallReceived(call);
        break;
      }
      case enums.INCOMING_CALL_CANCELLED: {
        //occurs(call dismissed) at the callee end, caller cancels the call
        this.incomingCallCancelled(call);
        break;
      }

      default:
        break;
    }
  }

  incomingCallReceived(incomingCall) {
    const activeCall = CometChat.getActiveCall();
    console.log("incoming calllll ", incomingCall);

    //if there is another call in progress
    if (activeCall) {
      CometChat.rejectCall(incomingCall.sessionId, CometChat.CALL_STATUS.BUSY)
        .then((rejectedCall) => {
          //mark as read incoming call message
          this.markMessageAsRead(incomingCall);
          // this.props.actionGenerated("rejectedIncomingCall", incomingCall, rejectedCall);
          this.actionGenerated.emit({
            type: "rejectedIncomingCall",
            payLoad: { incomingCall, rejectedCall },
          });
        })
        .catch((error) => {
          this.actionGenerated.emit({ type: "callError", payLoad: error });

          console.log("Call rejection failed with error:", error);
        });
    } else if (this.incomingCall === null) {
      // this.playIncomingAlert();

      if (incomingCall.sender.avatar === false) {
        const uid = incomingCall.sender.uid;
        const char = incomingCall.sender.name.charAt(0).toUpperCase();
        console.log("name call ", char);

        // incomingCall.sender.avatar = SvgAvatar.getAvatar(uid, char);
      }

      // this.setState({ incomingCall: incomingCall });
      this.incomingCall = incomingCall;
    }
  }

  markMessageAsRead(message) {
    const receiverType = message.receiverType;
    const receiverId =
      receiverType === "user" ? message.sender.uid : message.receiverId;

    if (message.hasOwnProperty("readAt") === false) {
      CometChat.markAsRead(message.id, receiverId, receiverType);
    }
  }

  incomingCallCancelled(call) {
    //we are not marking this as read as it will done in messagelist component
    // this.pauseIncomingAlert();
    this.incomingCall = null;
  }

  /**
   * Rejects call when user click reject
   */
  rejectCall() {
    //this.pauseIncomingAlert();
    CometChatManager.rejectCall(
      this.incomingCall.sessionId,
      CometChat.CALL_STATUS.REJECTED
    )
      .then((rejectedCall) => {
        this.actionGenerated.emit({
          type: "rejectedIncomingCall",
          payLoad: { ...this.incomingCall, rejectedCall },
        });
        // this.props.actionGenerated("rejectedIncomingCall", this.state.incomingCall, rejectedCall);
        this.incomingCall = null;
      })
      .catch((error) => {
        this.actionGenerated.emit({ type: "callError", payLoad: error });
        this.incomingCall = null;
      });
  }

  acceptCall() {
    //this.pauseIncomingAlert();
    console.log("incoming call data", this.incomingCall);

    this.actionGenerated.emit({
      type: "acceptIncomingCall",
      payLoad: { ...this.incomingCall },
    });
    this.incomingCall = null;
    //     this.callInProgress=this.callInProgress
  }
}
