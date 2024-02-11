import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonesPaginacionComponent } from './botones-paginacion.component';

describe('BotonesPaginacionComponent', () => {
  let component: BotonesPaginacionComponent;
  let fixture: ComponentFixture<BotonesPaginacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BotonesPaginacionComponent]
    });
    fixture = TestBed.createComponent(BotonesPaginacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
