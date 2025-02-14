import { IAlert } from '../../../../../../../caracterizacion-back/src/modules/ficha/interface/alerts.interfaces';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.scss']
})
export class AlertasComponent implements OnInit {
  @Input() alertas: IAlert[] = [];

  constructor() {}

  public mostrarAlerta(alerta: IAlert): void {
    console.log('Alerta activada:', alerta);
  }

  ngOnInit() {}
}
