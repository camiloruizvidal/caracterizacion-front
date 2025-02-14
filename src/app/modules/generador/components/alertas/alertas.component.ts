import { Component, Input, OnInit } from '@angular/core';
import { IAlert } from '../../interfaces/interface';

type tipoAlertas = 'individual' | 'grupal';
@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.scss']
})
export class AlertasComponent implements OnInit {
  @Input() alertas: IAlert[] = [];
  @Input() tipoAlerta!: tipoAlertas;

  constructor() {}

  public mostrarAlerta(alerta: IAlert): void {
    console.log('Alerta activada:', alerta);
  }

  ngOnInit() {}
}
