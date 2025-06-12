import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BajajAssignedListComponent } from './bajaj-assigned-list.component';

describe('BajajAssignedListComponent', () => {
  let component: BajajAssignedListComponent;
  let fixture: ComponentFixture<BajajAssignedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BajajAssignedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BajajAssignedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
