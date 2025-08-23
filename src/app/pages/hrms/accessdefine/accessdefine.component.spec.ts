import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessdefineComponent } from './accessdefine.component';

describe('AccessdefineComponent', () => {
  let component: AccessdefineComponent;
  let fixture: ComponentFixture<AccessdefineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessdefineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessdefineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
