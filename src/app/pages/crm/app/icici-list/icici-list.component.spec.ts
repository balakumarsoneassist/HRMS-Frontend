import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IciciListComponent } from './icici-list.component';

describe('IciciListComponent', () => {
  let component: IciciListComponent;
  let fixture: ComponentFixture<IciciListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IciciListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IciciListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
