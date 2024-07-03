import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueDinamicComponent } from './value-dinamic.component';

describe('ValueDinamicComponent', () => {
  let component: ValueDinamicComponent;
  let fixture: ComponentFixture<ValueDinamicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValueDinamicComponent]
    });
    fixture = TestBed.createComponent(ValueDinamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
