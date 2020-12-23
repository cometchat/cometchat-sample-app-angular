import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";

@Component({
  selector: "receiver-poll-bubble",
  templateUrl: "./receiver-poll-bubble.component.html",
  styleUrls: ["./receiver-poll-bubble.component.css"],
})
export class ReceiverPollBubbleComponent implements OnInit {
  @Input() MessageDetails = null;
  @Input() showReplyCount = true;

  @Input() loggedInUserUid = "";

  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();

  @Input() showToolTip = true;

  isPollExtensionEnabled: boolean = false;
  pollId = "";
  pollExtensionData = null;
  pollOptions = [];
  totalVotes = 0;
  selectedOption = null;

  constructor() {}

  ngOnInit() {
    console.log(
      "receiver Poll bubble --> message details ",
      this.MessageDetails
    );

    this.checkPollExtension();
  }

  /**
   * Displays the poll component , only if it is enabled
   * @param Event action
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
            console.log("receiver Poll bubble --> Enable poll extension ");
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

    this.pollId = this.pollExtensionData.id;

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
        //   `reciver poll bubble --> percentage of ${this.pollExtensionData.options[currentItem]} is ${calculatedPercent} `
        // );
      }

      let selectedByLoggedInUser = false;
      if (optionData.hasOwnProperty("voters")) {
        console.log(this.loggedInUserUid);
        console.log(optionData.voters);
        console.log(optionData.voters.hasOwnProperty(this.loggedInUserUid));
        if (optionData.voters.hasOwnProperty(this.loggedInUserUid)) {
          selectedByLoggedInUser = true;
        }
      }

      optionList.push({
        id: currentItem,
        percent: calculatedPercent + "%",
        text: this.pollExtensionData.options[currentItem],
        selectedByLoggedInUser,
      });
    });

    this.pollOptions = [...optionList];

    console.log(`reciver poll bubble --> option list `, optionList);
  }

  /**
   * sends the  answer selected by the user for the  the poll question
   * @param Any selectedOption
   */
  answerPollQuestion(selectedOption) {
    this.selectedOption = selectedOption;
    console.log(" receiver poll bubble -->> option selected ", selectedOption);

    CometChat.callExtension("polls", "POST", "v1/vote", {
      vote: selectedOption.id,
      id: this.pollId,
    })
      .then((response) => {
        console.log(
          " receiver poll bubble -->> poll answered sucessfully ",
          response
        );

        this.actionGenerated.emit({
          type: "pollAnswered",
          payLoad: response,
        });
      })
      .catch((error) => {
        console.log("answerPollQuestion error", error);
      });
  }

  /**
   * gets the time at which the current message was sent
   * @param
   */
  getTime() {
    let msgSentAt = this.MessageDetails.sentAt;
    let timeStamp = new Date(msgSentAt * 1000).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return timeStamp;
  }

  /**
   * Handles all the actions emitted by the child components that make the current component
   * @param Event action
   */
  actionHandler(action) {
    console.log("receiver Poll Bubble --> action generation is ", action);
    this.actionGenerated.emit(action);
  }

  /**
   * dynamically applies styles based on coditions
   * @param Event action
   */
  getStyles(key = null, data = null) {
    switch (key) {
      case "answerWrapperStyle": {
        if (data.id !== this.selectedOption.id) {
          return { background: "none" };
        }

        break;
      }
    }

    //return { background: "none" };
    return {};
  }
}
