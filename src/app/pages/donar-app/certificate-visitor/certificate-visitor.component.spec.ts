import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateVisitorComponent } from './certificate-visitor.component';

describe('CertificateVisitorComponent', () => {
  let component: CertificateVisitorComponent;
  let fixture: ComponentFixture<CertificateVisitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertificateVisitorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificateVisitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
