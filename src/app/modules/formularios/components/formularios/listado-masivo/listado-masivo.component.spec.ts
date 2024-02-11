import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoMasivoComponent } from './listado-masivo.component';

describe('ListadoMasivoComponent', () => {
  let component: ListadoMasivoComponent;
  let fixture: ComponentFixture<ListadoMasivoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoMasivoComponent]
    });
    fixture = TestBed.createComponent(ListadoMasivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
