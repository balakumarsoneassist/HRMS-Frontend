import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemblockmembersComponent } from './memblockmembers.component';

describe('MemblockmembersComponent', () => {
  let component: MemblockmembersComponent;
  let fixture: ComponentFixture<MemblockmembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemblockmembersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemblockmembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
