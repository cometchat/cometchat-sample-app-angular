import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatMessageListComponent } from "./cometchat-message-list.component";

describe("MessageListComponent", () => {
  let component: CometchatMessageListComponent;
  let fixture: ComponentFixture<CometchatMessageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatMessageListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatMessageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
