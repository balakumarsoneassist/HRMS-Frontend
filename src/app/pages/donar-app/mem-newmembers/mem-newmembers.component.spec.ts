import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemNewmembersComponent } from './mem-newmembers.component';

describe('MemNewmembersComponent', () => {
  let component: MemNewmembersComponent;
  let fixture: ComponentFixture<MemNewmembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemNewmembersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemNewmembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
