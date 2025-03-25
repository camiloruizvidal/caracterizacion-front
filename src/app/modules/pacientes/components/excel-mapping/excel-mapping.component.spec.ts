import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelMappingComponent } from './excel-mapping.component';

describe('ExcelMappingComponent', () => {
  let component: ExcelMappingComponent;
  let fixture: ComponentFixture<ExcelMappingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExcelMappingComponent]
    });
    fixture = TestBed.createComponent(ExcelMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
