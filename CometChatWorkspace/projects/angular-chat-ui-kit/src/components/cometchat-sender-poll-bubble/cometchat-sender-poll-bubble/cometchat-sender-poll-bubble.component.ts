import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { checkMessageForExtensionsData } from "../../utils/common";
import { STRING_MESSAGES } from "../../utils/messageConstants";

@Component({
  selector: "cometchat-sender-poll-bubble",
  templateUrl: "./cometchat-sender-poll-bubble.component.html",
  styleUrls: ["./cometchat-sender-poll-bubble.component.css"],
})
export class CometchatSenderPollBubbleComponent implements OnInit {
  @Input() MessageDetails = null;
  @Input() showReplyCount = true;
  @Input() loggedInUser;

  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();

  @Input() showToolTip = true;

  isPollExtensionEnabled: boolean = false;
  checkReaction: boolean = false;

  pollExtensionData = null;
  pollOptions = [];
  totalVotes = 0;

  constructor() {}

  ngOnInit() {
    // console.log("sener Poll bubble --> message details ", this.MessageDetails);

    this.checkPollExtension();
    this.checkReaction = checkMessageForExtensionsData(
      this.MessageDetails,
      STRING_MESSAGES.REACTIONS
    );
  }

  /**
   * Displays the poll component , only if it is enabled
   * @param
   */
  checkPollExtension() {
    if (this.MessageDetails.hasOwnProperty("metadata")) {
      if (this.MessageDetails.metadata.hasOwnProperty("@injected")) {
        if (
          this.MessageDetails.metadata["@injected"].hasOwnProperty("extensions")
        ) {
          if (
            this.MessageDetails.metadata["@injected"][
              "extensions"
            ].hasOwnProperty("polls")
          ) {
            console.log("sender Poll bubble --> Enable poll extension ");
            this.isPollExtensionEnabled = true;
            this.setPollExtensionData();
          }
        }
      }
    }
  }

  /**
   * Sets Poll Data
   * @param
   */
  setPollExtensionData() {
    this.pollExtensionData = this.MessageDetails.metadata["@injected"][
      "extensions"
    ]["polls"];

    this.totalVotes = this.pollExtensionData.results.total;

    let optionKeys = Object.keys(this.pollExtensionData.options);

    let optionList = [];
    optionKeys.forEach((currentItem) => {
      // Add Percentage calculation logic
      const optionData = this.pollExtensionData.results.options[currentItem];
      const vote = optionData["count"];
      let calculatedPercent = 0;

      if (this.totalVotes > 0) {
        calculatedPercent = Math.round((vote / this.totalVotes) * 100);

        // console.log(
        //   `sender poll bubble --> percentage of ${this.pollExtensionData.options[currentItem]} is ${calculatedPercent} `
        // );
      }

      optionList.push({
        id: currentItem,
        percent: calculatedPercent + "%",
        text: this.pollExtensionData.options[currentItem],
      });
    });

    this.pollOptions = [...optionList];
  }

  /**
   * Handles all the actions emitted by the child components that make the current component
   * @param Event action
   */
  actionHandler(action) {
    console.log("Sender Poll Bubble --> action generation is ", action);
    this.actionGenerated.emit(action);
  }
}
