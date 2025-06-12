import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CibilCheckComponent } from './cibil-check.component';

describe('CibilCheckComponent', () => {
  let component: CibilCheckComponent;
  let fixture: ComponentFixture<CibilCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CibilCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CibilCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
