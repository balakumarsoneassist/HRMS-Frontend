import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReassignRejectlistComponent } from './reassign-rejectlist.component';

describe('ReassignRejectlistComponent', () => {
  let component: ReassignRejectlistComponent;
  let fixture: ComponentFixture<ReassignRejectlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReassignRejectlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReassignRejectlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
