import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../utils/enums";
import { checkMessageForExtensionsData } from "../../utils/common";
import { REACTION_ICON } from "../../resources/icons/reaction";

@Component({
  selector: "cometchat-regular-reaction-view",
  templateUrl: "./cometchat-regular-reaction-view.component.html",
  styleUrls: ["./cometchat-regular-reaction-view.component.css"],
})
export class CometchatRegularReactionViewComponent implements OnInit {
  @Input() MessageDetails = null;
  @Input() loggedInUser;
  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();
  selectedEmoji = ":grinning:";
  test;
  test1;
  reactionsName;
  messageReactions = [];
  reactionIcon = REACTION_ICON;

  constructor() {}

  ngOnInit() {
    this.test = checkMessageForExtensionsData(this.MessageDetails, "reactions");
    console.log("reaction view test ", this.test);

    this.test1 = this.getMessageReactions(this.test);
  }

  getMessageReactions(reaction) {
    if (reaction === null) {
      return null;
    }
    let messageReactions = [];
    Object.keys(reaction).map((data, key) => {
      const reactionData = reaction[data];
      const reactionCount = Object.keys(reactionData).length;
      console.log("reactionCount ", reactionCount);

      let showBlueOutline = false;
      if (reactionData.hasOwnProperty(this.loggedInUser.uid)) {
        showBlueOutline = true;
      }

      const reactionName = data;
      let messageReaction;

      const userList = [];
      let reactionTitle = "";

      for (const user in reactionData) {
        userList.push(reactionData[user]["name"]);
      }

      if (userList.length) {
        reactionTitle = userList.join(", ");
        reactionTitle = reactionTitle.concat(" reacted");
      }

      if (reactionCount) {
        messageReaction = {
          reactionName,
          reactionCount,
          reactionTitle,
          showBlueOutline,
        };
      } else {
        messageReaction = { reactionName, reactionTitle, showBlueOutline };
      }

      messageReactions.push(messageReaction);
    });
    this.messageReactions = messageReactions;
    return;
  }

  reactToMessages(emoji = null) {
    // console.log("Regular reaction -> event ", $event);

    // console.log("reactToMessages");

    CometChat.callExtension("reactions", "POST", "v1/react", {
      msgId: this.MessageDetails.id,
      emoji: emoji.colons || emoji.reactionName,
    })
      .then((response) => {
        // Reaction added successfully
      })
      .catch((error) => {
        // Some error occured
      });
  }

  triggerEmojiClick(event) {
    console.log("triggerEmojiClick");

    event.stopPropagation();
    event.currentTarget.querySelector(".emoji-mart-emoji").click();
  }

  sendReaction() {
    this.actionGenerated.emit({
      type: enums.REACT_TO_MESSAGE,
      payLoad: this.MessageDetails,
    });
  }
}
