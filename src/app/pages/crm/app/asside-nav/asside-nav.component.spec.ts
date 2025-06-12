import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssideNavComponent } from './asside-nav.component';

describe('AssideNavComponent', () => {
  let component: AssideNavComponent;
  let fixture: ComponentFixture<AssideNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssideNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
