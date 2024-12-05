import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngb-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{ titulo }}</h4>
      <button
        type="button"
        class="btn-close"
        aria-label="Close"
        (click)="activeModal.dismiss()"
      ></button>
    </div>
    <div class="modal-body">
      <p>{{ mensaje }}</p>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-primary"
        (click)="activeModal.close('ok')"
      >
        Aceptar
      </button>
    </div>
  `
})
export class NgbModalContent {
  @Input() titulo = 'Información';
  @Input() mensaje = 'Mensaje genérico';

  constructor(public activeModal: NgbActiveModal) {}
}
