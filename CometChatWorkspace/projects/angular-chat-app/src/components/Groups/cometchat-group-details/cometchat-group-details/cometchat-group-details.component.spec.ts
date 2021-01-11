import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatGroupDetailsComponent } from "./cometchat-group-details.component";

describe("CometchatGroupDetailComponent", () => {
  let component: CometchatGroupDetailsComponent;
  let fixture: ComponentFixture<CometchatGroupDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatGroupDetailsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatGroupDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
