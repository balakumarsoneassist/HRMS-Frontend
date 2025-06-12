import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectorFormModelComponent } from './connector-form-model.component';

describe('ConnectorFormModelComponent', () => {
  let component: ConnectorFormModelComponent;
  let fixture: ComponentFixture<ConnectorFormModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectorFormModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectorFormModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
