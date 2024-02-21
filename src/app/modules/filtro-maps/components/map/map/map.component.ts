import * as moment from 'moment';
import { IFichaFmiliar } from 'src/app/helpers/interface/interface';
import { FormulariosService } from './../../../../formularios/services/formularios.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  public cards!: IFichaFmiliar[];
  public markers: any[] = [];
  public zoom: number = 12;
  public center!: google.maps.LatLngLiteral;
  public options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true
  };

  constructor(private formulariosService: FormulariosService) {}

  ngOnInit(): void {
    this.addMarker();
  }

  public addMarker() {
    this.formulariosService
      .obtenerDatosFicha()
      .subscribe((response: IFichaFmiliar[]) => {
        this.cards = response;
        this.markers = response.map((tarjeta: IFichaFmiliar) => ({
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
}
