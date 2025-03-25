import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapeoExcelComponent } from './mapeo-excel.component';

describe('ExcelMappingComponent', () => {
  let component: MapeoExcelComponent;
  let fixture: ComponentFixture<MapeoExcelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapeoExcelComponent]
    });
    fixture = TestBed.createComponent(MapeoExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
