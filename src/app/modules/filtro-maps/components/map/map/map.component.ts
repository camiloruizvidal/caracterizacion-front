import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  public markers: any[] = [];
  public zoom: number = 12;
  public center!: google.maps.LatLngLiteral;
  public options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true
    //maxZoom: 15,
    //minZoom: 8
  };

  ngOnInit(): void {
    for (let i = 0; i < 10; i++) {
      this.addMarker();
    }
    this.calculateCenter();
  }
  private calculateCenter(): void {
    if (this.markers.length === 0) {
      this.center = { lat: 0, lng: 0 };
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

  private randomPosition(
    basePosition: google.maps.LatLngLiteral,
    distanceInKilometers: number = 4
  ): google.maps.LatLngLiteral {
    const earthRadius = 6371;
    const randomLat =
      (Math.random() - 0.5) *
      (distanceInKilometers / earthRadius) *
      (360 / (2 * Math.PI));
    const randomLng =
      (Math.random() - 0.5) *
      (distanceInKilometers /
        (earthRadius * Math.cos((basePosition.lat * Math.PI) / 180))) *
      (360 / (2 * Math.PI));

    const lat = basePosition.lat + randomLat;
    const lng = basePosition.lng + randomLng;

    return { lat, lng };
  }

  addMarker() {
    this.markers.push({
      position: this.randomPosition(
        {
          lat: 2.473984,
          lng: -76.726272
        },
        10
      ),
      label: {
        color: 'white',
        text: (this.markers.length + 1).toString()
      },
      title: 'Marker title ' + (this.markers.length + 1)
    });
  }
}
