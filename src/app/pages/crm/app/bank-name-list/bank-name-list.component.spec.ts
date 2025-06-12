import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankNameListComponent } from './bank-name-list.component';

describe('BankNameListComponent', () => {
  let component: BankNameListComponent;
  let fixture: ComponentFixture<BankNameListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankNameListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankNameListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
