import { Component } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {
  lat = 40.712776;
  lng = -74.005974;
  zoom = 10;

  markers = [
    { lat: 40.712776, lng: -74.005974, label: 'A', draggable: true },
    { lat: 40.7291, lng: -73.9965, label: 'B', draggable: false },
    { lat: 40.748817, lng: -73.985428, label: 'C', draggable: true },
  ];

  clickedMarker(label: string) {
    console.log(`Marcador clickeado: ${label}`);
  }
}
