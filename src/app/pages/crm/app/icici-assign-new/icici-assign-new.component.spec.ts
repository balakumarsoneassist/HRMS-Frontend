import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IciciAssignNewComponent } from './icici-assign-new.component';

describe('IciciAssignNewComponent', () => {
  let component: IciciAssignNewComponent;
  let fixture: ComponentFixture<IciciAssignNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IciciAssignNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IciciAssignNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
