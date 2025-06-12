import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectorContactListComponent } from './connector-contact-list.component';

describe('ConnectorContactListComponent', () => {
  let component: ConnectorContactListComponent;
  let fixture: ComponentFixture<ConnectorContactListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectorContactListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectorContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
