import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-overlay',
  templateUrl: './loading-overlay.component.html',
  styleUrls: ['./loading-overlay.component.scss']
})
export class LoadingOverlayComponent {
  @Input() isVisible: boolean = false;
  @Input() mainText: string = 'Cargando, por favor espere...';
  @Input() subText: string = 'No cierre ni recargue la página';
}