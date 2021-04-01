import { AfterViewInit, Component, OnInit } from '@angular/core';
// import the leaflet package
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})

// rajapinnan AfterViewInit implementointi.
// huomaa, että voit implementoida useita rajapintoja pilkun avulla
export class MapComponent implements AfterViewInit {
  // luokan muuttujien alustus tähän.
  private map: any;
  latlng: L.LatLng;
  lat: number;
  lon: number;

  /*laitetaan alkuarvot konstruktoriin, erityisesti jos käytetään
   tarkkaa tyypin määrittelyä.
   */
  constructor() {
    this.latlng = new L.LatLng(0, 0);
    this.lat = 0;
    this.lon = 0;
  }

  // ngOnInit: asiat joita tehdään kun tämä komponentti syntyy muistiin.
  // muutetaan se ngAfterViewInitiksi, koska käytetään tässä sitä.
  // eli tässä tapauksessa ladataan kartta vasta sitten, kun html -sivu on latautunut muistiin
  ngAfterViewInit(): void {
    this.initMap();
  }
  //luodaan kartta. map on L moduulin metodi.
  private initMap(): void {
    //watchPosition muuttaa sijaintia tausta-ajona, jos käyttäjä liikkuu.
    // selainta ei tarvitse hreffata, jotta sijainti päivittyisi.
    navigator.geolocation.watchPosition((position) => {
      this.latlng = new L.LatLng(
        position.coords.latitude,
        position.coords.longitude
      );
      this.lat = position.coords.latitude;
      this.lon = position.coords.longitude;

      this.map = L.map('map').setView(this.latlng, 13);

      // add the OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
      }).addTo(this.map);

      // show the scale bar on the lower left corner
      L.control.scale().addTo(this.map);

      // show a marker on the map
      L.marker(this.latlng)
        .bindPopup('The center of the world')
        .addTo(this.map);

      //koortinaatti, jolloin notifikaatio heitetään.

      if (this.lat > 62) {
        this.notifyMe();
      }
    });
  }

  //typescriptissä ei ole funktioita, ainoastaan metodeja, joita kutsutaan.
  // lupa notifikaatioille löytyy käyttäjäm selaimen asetuksista.
  notifyMe() {
    // Let's check if the browser supports notifications
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notification');
    }

    // onko notifikaatiot sallittu, jos on niin suoraan notia kehiin.
    else if (Notification.permission === 'granted') {
      // If it's okay let's create a notification
      const notification = new Notification(
        'Olet nyt 62 leveyspiirin poh.puolella'
      );
    }

    // jos notifikaatiot on estetty, kysyy lupaa.
    else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === 'granted') {
          const notification = new Notification(
            'Olet nyt 62 leveyspohpuolella.'
          );
        }
      });
    }

    // At last, if the user has denied notifications, and you
    // want to be respectful there is no need to bother them any more.
  }
}
