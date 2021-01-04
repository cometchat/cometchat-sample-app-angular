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
import { STRING_MESSAGES } from "../../utils/messageConstants";
@Component({
  selector: "cometchat-user-detail",
  templateUrl: "./cometchat-user-detail.component.html",
  styleUrls: ["./cometchat-user-detail.component.css"],
})
export class CometchatUserDetailComponent implements OnInit, OnChanges {
  @Input() item = null;
  @Input() type = null;
  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();

  OPTIONS: String = STRING_MESSAGES.OPTIONS;
  DETAILS: String = STRING_MESSAGES.DETAILS;

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
      this.blockUserText = STRING_MESSAGES.UNBLOCK_USER;
    } else {
      this.blockUserText = STRING_MESSAGES.BLOCK_USER;
    }
    // return this.blockUserText;
  }

  toggleBlockUser() {
    if (this.blockUserText === STRING_MESSAGES.BLOCK_USER) {
      this.actionGenerated.emit({
        type: enums.BLOCK_USER,
      });
      console.log("item is ", this.item);
    } else if (this.blockUserText === STRING_MESSAGES.UNBLOCK_USER) {
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
