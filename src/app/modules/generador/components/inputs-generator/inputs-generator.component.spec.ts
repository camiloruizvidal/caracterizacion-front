import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputsGeneratorComponent } from './inputs-generator.component';

describe('InputsGeneratorComponent', () => {
  let component: InputsGeneratorComponent;
  let fixture: ComponentFixture<InputsGeneratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputsGeneratorComponent]
    });
    fixture = TestBed.createComponent(InputsGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
