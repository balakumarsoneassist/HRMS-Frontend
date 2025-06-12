import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitcursorComponent } from './waitcursor.component';

describe('WaitcursorComponent', () => {
  let component: WaitcursorComponent;
  let fixture: ComponentFixture<WaitcursorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitcursorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitcursorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
