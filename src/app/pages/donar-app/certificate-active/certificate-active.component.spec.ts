import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateActiveComponent } from './certificate-active.component';

describe('CertificateActiveComponent', () => {
  let component: CertificateActiveComponent;
  let fixture: ComponentFixture<CertificateActiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertificateActiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificateActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
