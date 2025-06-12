import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemInactivemembersComponent } from './mem-inactivemembers.component';

describe('MemInactivemembersComponent', () => {
  let component: MemInactivemembersComponent;
  let fixture: ComponentFixture<MemInactivemembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemInactivemembersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemInactivemembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
