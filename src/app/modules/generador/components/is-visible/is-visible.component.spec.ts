import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsVisibleComponent } from './is-visible.component';

describe('IsVisibleComponent', () => {
  let component: IsVisibleComponent;
  let fixture: ComponentFixture<IsVisibleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IsVisibleComponent]
    });
    fixture = TestBed.createComponent(IsVisibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
