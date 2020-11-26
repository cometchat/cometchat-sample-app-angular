import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "lib-cometchat-message-list-screen",
  templateUrl: "./cometchat-message-list-screen.component.html",
  styleUrls: ["./cometchat-message-list-screen.component.css"],
})
export class CometchatMessageListScreenComponent implements OnInit {
  @Input() item = null;
  @Input() type = null;

  constructor() {}

  ngOnInit() {
    //console.log("MessageListScreen -> Type of User ", this.type);
  }

  /**
   * Edit and Sent a Text message
   * @param Event e
   */
  actionHandler(e) {
    //handle Events/Actions generated from MessageHeader , MessageComposer and MessageList Here
    console.log("MessageListScreen --> action generation is ", e);
  }
}
