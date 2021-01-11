import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatGroupListItemComponent } from "./cometchat-group-list-item.component";

describe("GroupViewComponent", () => {
  let component: CometchatGroupListItemComponent;
  let fixture: ComponentFixture<CometchatGroupListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatGroupListItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatGroupListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
