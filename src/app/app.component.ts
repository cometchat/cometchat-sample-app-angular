import { Component, Input, ChangeDetectorRef, OnChanges, ɵɵNgOnChangesFeature } from '@angular/core';
import { CometChat } from '@cometchat-pro/chat';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']

})

export class AppComponent {
  title = 'angular-CometChat-pro';
  user?: object;
  json = JSON;
  group?: object;
  constructor(private cdRef: ChangeDetectorRef) { }

  onItemSelected = (item, type) => {
    console.log('I am getting called', { item, type });
    if (type === 'group') {
      this.group = item;
      this.user = undefined;
    } else {
      this.user = item;
      this.group = undefined;
    }
    this.cdRef.detectChanges();
  }


  onMediItemClick = (item) => {
    console.log(item, 'onMediaItemClick');
  }
}
