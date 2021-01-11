import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatReadRecieptComponent } from "./cometchat-read-reciept.component";

describe("ReadRecieptComponent", () => {
  let component: CometchatReadRecieptComponent;
  let fixture: ComponentFixture<CometchatReadRecieptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatReadRecieptComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatReadRecieptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
