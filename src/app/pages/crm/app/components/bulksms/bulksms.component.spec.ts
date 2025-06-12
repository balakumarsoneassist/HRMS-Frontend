import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulksmsComponent } from './bulksms.component';

describe('BulksmsComponent', () => {
  let component: BulksmsComponent;
  let fixture: ComponentFixture<BulksmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulksmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulksmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
