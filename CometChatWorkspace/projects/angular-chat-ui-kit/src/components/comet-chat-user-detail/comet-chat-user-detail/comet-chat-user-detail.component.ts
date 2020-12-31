import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
} from "@angular/core";
import * as enums from "../../utils/enums";
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
      this.blockUserText = enums.UNBLOCK_USER_TEXT;
    } else {
      this.blockUserText = enums.BLOCK_USER_TEXT;
    }
    // return this.blockUserText;
  }

  toggleBlockUser() {
    if (this.blockUserText === "Block User") {
      this.actionGenerated.emit({
        type: enums.BLOCK_USER,
      });
      console.log("item is ", this.item);
    } else if (this.blockUserText === "Unblock User") {
      this.actionGenerated.emit({
        type: enums.UNBLOCK_USER,
      });
    }
  }

  /**
   * Close thread when opened in small screen
   */
  closeThreadView() {
    this.actionGenerated.emit({
      type: enums.CLOSE_DETAIL_CLICKED,
    });
  }
}
