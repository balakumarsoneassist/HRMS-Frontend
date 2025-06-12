import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportExcelFileListComponent } from './import-excel-file-list.component';

describe('ImportExcelFileListComponent', () => {
  let component: ImportExcelFileListComponent;
  let fixture: ComponentFixture<ImportExcelFileListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportExcelFileListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportExcelFileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
