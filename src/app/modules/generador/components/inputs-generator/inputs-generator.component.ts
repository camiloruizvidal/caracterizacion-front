import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IGruposFicha } from './../../interfaces/interface';
import { InputsService } from './../../services/inputs.service';
import { Component, OnInit } from '@angular/core';
import { ESteperType } from 'src/app/helpers/interface/interface';

@Component({
  selector: 'app-inputs-generator',
  templateUrl: './inputs-generator.component.html',
  styleUrls: ['./inputs-generator.component.scss']
})
export class InputsGeneratorComponent implements OnInit {
  public grupos: IGruposFicha[] = [];
  public formulario: FormGroup;
  public tipos: string[] = [];
  
  public formularioGenerado: any;

  constructor(
    private formBuilder: FormBuilder,
    private inputsService: InputsService
  ) {
    this.formulario = this.formBuilder.group({
      fichaTipo: ['', Validators.required],
      grupo: ['', Validators.required],
      tipo: [''],
      textoPregunta: ['', Validators.required],
      esRequerido: [false]
    });
  }

  ngOnInit(): void {
    this.cargarGrupos();
    this.cargarTipos();
  }

  private cargarTipos() {
    this.tipos = Object.keys(ESteperType);
  }

  private cargarGrupos() {
    this.inputsService
      .obtenerGruposFichas()
      .subscribe((result: IGruposFicha[]) => {
        this.grupos = result;
      });
  }

  public agregar() {
    if (this.formulario.valid) {
      console.log(this.formulario.value);
      this.formulario.reset();
    } else {
      this.formulario.markAllAsTouched();
    }
  }
}
