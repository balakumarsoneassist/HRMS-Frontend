import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadertestComponent } from './loadertest.component';

describe('LoadertestComponent', () => {
  let component: LoadertestComponent;
  let fixture: ComponentFixture<LoadertestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadertestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadertestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
