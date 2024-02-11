import { IPagination } from 'src/app/helpers/interface/interface';
import { FormulariosService } from './../../../services/formularios.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listado-masivo',
  templateUrl: './listado-masivo.component.html',
  styleUrls: ['./listado-masivo.component.scss'],
})
export class ListadoMasivoComponent implements OnInit {
  public forms!: IPagination<any>;
  constructor(private formulariosService: FormulariosService) {}

  ngOnInit(): void {
    this.loadForms();
  }

  public loadForms() {
    this.formulariosService.obtenerFormularios().subscribe(response =>{
      this.forms = response
    })
  }
}
