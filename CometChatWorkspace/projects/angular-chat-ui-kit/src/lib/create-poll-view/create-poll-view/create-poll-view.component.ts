import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormArray,
  AbstractControl,
} from "@angular/forms";

import { CometChat } from "@cometchat-pro/chat";

@Component({
  selector: "create-poll-view",
  templateUrl: "./create-poll-view.component.html",
  styleUrls: ["./create-poll-view.component.css"],
})
export class CreatePollViewComponent implements OnInit {
  pollFormData: FormGroup;
  errorText = "";
  @Input() item = null;
  @Input() type = null;

  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.pollFormData = this.fb.group({
      question: "",
      firstOption: "",
      secondOption: "",
      optionItems: this.fb.array([]),
    });
  }

  ngOnInit() {}

  /**
   * Used to add an extra option
   * @param
   */
  addPollOption() {
    (this.pollFormData.get("optionItems") as FormArray).push(
      this.fb.control(null)
    );
  }

  /**
   * Used to remove an extra option
   * @param number index
   */
  removePollOption(index) {
    (this.pollFormData.get("optionItems") as FormArray).removeAt(index);
  }

  getOptionsFormControls(): AbstractControl[] {
    return (<FormArray>this.pollFormData.get("optionItems")).controls;
  }

  /**
   * Creates the poll
   * @param Any values
   */
  createPoll(values) {
    // console.log("create Poll View --> create poll with below data", values);

    if (values.question.trim().length === 0) {
      this.errorText = "Question cannnot be blank.";
      return false;
    }

    if (
      values.firstOption.trim().length === 0 ||
      values.secondOption.trim().length === 0
    ) {
      this.errorText = "Option cannnot be blank.";
      return false;
    }

    let optionList = [
      values.firstOption,
      values.secondOption,
      ...values.optionItems,
    ];

    let receiverId;
    let receiverType = this.type;
    if (this.type === "user") {
      receiverId = this.item.uid;
    } else if (this.type === "group") {
      receiverId = this.item.guid;
    }

    CometChat.callExtension("polls", "POST", "v1/create", {
      question: values.question,
      options: optionList,
      receiver: receiverId,
      receiverType: receiverType,
    })
      .then((response: any) => {
        //const data = response.message.data;
        const data = response.message.data;
        const customData = data.data.customData;
        const options = customData.options;

        const resultOptions = {};
        for (const option in options) {
          resultOptions[option] = {
            text: options[option],
            count: 0,
          };
        }

        const polls = {
          id: data.id,
          options: options,
          results: {
            total: 0,
            options: resultOptions,
            question: customData.question,
          },
          question: customData.question,
        };

        const message = {
          ...data,
          sender: { uid: data.sender },
          metadata: { "@injected": { extensions: { polls: polls } } },
        };

        // console.log(" create poll view --> poll created ", message);

        this.actionGenerated.emit({ type: "pollCreated", payLoad: message });
        this.errorText = "";
      })
      .catch((error) => {
        console.log("error", error);
        this.errorText = error.message.message;
      });

    //this.resetPollFormData();
  }

  /**
   * Resets Information of poll to initial conditons
   * @param
   */
  resetPollFormData() {
    this.pollFormData.reset();
  }

  /**
   * Emits an action to close the poll view
   * @param
   */
  closePollView() {
    this.actionGenerated.emit({ type: "closePollView", payLoad: null });
  }
}
