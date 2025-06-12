import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectorFollowUpFormComponent } from './connector-follow-up-form.component';

describe('ConnectorFollowUpFormComponent', () => {
  let component: ConnectorFollowUpFormComponent;
  let fixture: ComponentFixture<ConnectorFollowUpFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectorFollowUpFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectorFollowUpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
