import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
} from "@angular/core";

import { BLOCK_USER, UNBLOCK_USER } from "../../utils/enums";

@Component({
  selector: "comet-chat-user-detail",
  templateUrl: "./comet-chat-user-detail.component.html",
  styleUrls: ["./comet-chat-user-detail.component.css"],
})
export class CometChatUserDetailComponent implements OnInit, OnChanges {
  @Input() item = null;
  @Input() type = null;
  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();

  blockUserText: string;
  constructor() {}

  ngOnChanges(change: SimpleChanges) {
    // console.log("Message List --> ngOnChanges -->  ", change);

    if (change["item"]) {
      this.getBlockStatus(change["item"].currentValue);
      console.log(
        "userDetailScreen ->> new user obj ",
        change["item"].currentValue
      );
    }
  }
  ngOnInit() {
    console.log("item is ", this.item);
  }

  getBlockStatus(item) {
    if (item.blockedByMe) {
      this.blockUserText = UNBLOCK_USER;
    } else {
      this.blockUserText = BLOCK_USER;
    }
    // return this.blockUserText;
  }

  toggleBlockUser() {
    if (this.blockUserText === "Block User") {
      this.actionGenerated.emit({
        type: "blockUser",
      });
      console.log("item is ", this.item);
    } else if (this.blockUserText === "Unblock User") {
      this.actionGenerated.emit({
        type: "unblockUser",
      });
    }
  }
}
