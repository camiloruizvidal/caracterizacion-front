import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent {
  private id: number;
  constructor(private route: ActivatedRoute) {
    this.id = Number(this.route.snapshot.params['id']);
    console.log({ id: this.id });
  }
}
