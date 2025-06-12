import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemtotalmembersComponent } from './memtotalmembers.component';

describe('MemtotalmembersComponent', () => {
  let component: MemtotalmembersComponent;
  let fixture: ComponentFixture<MemtotalmembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemtotalmembersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemtotalmembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
