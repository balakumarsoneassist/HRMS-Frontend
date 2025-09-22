import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessViewComponent } from './access-view.component';

describe('AccessViewComponent', () => {
  let component: AccessViewComponent;
  let fixture: ComponentFixture<AccessViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
