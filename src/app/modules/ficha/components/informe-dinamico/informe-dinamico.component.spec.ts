import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeDinamicoComponent } from './informe-dinamico.component';

describe('InformeDinamicoComponent', () => {
  let component: InformeDinamicoComponent;
  let fixture: ComponentFixture<InformeDinamicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InformeDinamicoComponent]
    });
    fixture = TestBed.createComponent(InformeDinamicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
