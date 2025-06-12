import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReassignOtherlistComponent } from './reassign-otherlist.component';

describe('ReassignOtherlistComponent', () => {
  let component: ReassignOtherlistComponent;
  let fixture: ComponentFixture<ReassignOtherlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReassignOtherlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReassignOtherlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
