import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectorListComponent } from './connector-list.component';

describe('ConnectorListComponent', () => {
  let component: ConnectorListComponent;
  let fixture: ComponentFixture<ConnectorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
