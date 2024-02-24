import {
  IPagination,
  ISelect
} from './../../../../../helpers/interface/interface';
import { DataService } from './../../../services/data/data.service';
import * as moment from 'moment';
import { IFichaFmiliar } from 'src/app/helpers/interface/interface';
import { FormulariosService } from './../../../../formularios/services/formularios.service';
import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/modules/user/interface/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  public miFormulario: FormGroup;
  public cards!: IPagination<IFichaFmiliar>;
  public municipalities: ISelect[] = [];
  public users: IUser[] = [];
  public markers: any[] = [];
  public zoom: number = 12;
  public center!: google.maps.LatLngLiteral;
  public page: number = 1;
  public pageSize: number = 10;
  public options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true
  };

  constructor(
    private formulariosService: FormulariosService,
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) {
    this.miFormulario = this.formBuilder.group({
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      usuarioId: ['', Validators.required],
      municipio: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.enviarFormulario();
    this.loadMunicipalities();
    this.loadUsers();
  }

  private loadMunicipalities(): void {
    this.dataService
      .getMunicipalities()
      .subscribe((municipalities: ISelect[]) => {
        this.municipalities = municipalities;
      });
  }

  private loadUsers(): void {
    this.dataService.getUsers().subscribe((users: IUser[]) => {
      this.users = users;
    });
  }

  public changePagination(page: { itemsPerPage: number; currentPage: number }) {
    this.enviarFormulario(page.currentPage, page.itemsPerPage);
  }

  public enviarFormulario(page: number = 1, pageSize = 10) {
    this.page = page;
    this.pageSize = pageSize;
    this.formulariosService
      .obtenerDatosFicha({
        ...this.miFormulario.value,
        page: this.page,
        pageSize: this.pageSize
      })
      .subscribe((response: IPagination<IFichaFmiliar>) => {
        this.cards = response;
        this.markers = response.data.map((tarjeta: IFichaFmiliar) => ({
          position: tarjeta.tarjetasFamiliares.ubicacion_gps,
          label: {
            color: 'red'
          },
          title: 'India Warning Location'
        }));

        this.calculateCenter();
      });
  }

  private calculateCenter(): void {
    if (this.markers.length === 0) {
      this.center = { lat: 2.4387, lng: -76.6147 };
      return;
    }

    const sumLat = this.markers.reduce(
      (acc, marker) => acc + marker.position.lat,
      0
    );
    const sumLng = this.markers.reduce(
      (acc, marker) => acc + marker.position.lng,
      0
    );
    const avgLat = sumLat / this.markers.length;
    const avgLng = sumLng / this.markers.length;
    this.center = { lat: avgLat, lng: avgLng };
  }

  public reiniciarForm(): void {
    this.miFormulario.reset();
  }
}
