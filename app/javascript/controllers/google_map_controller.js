import { Controller } from "@hotwired/stimulus"
import { Loader } from "@googlemaps/js-api-loader"

// Connects to data-controller="google-map"
export default class extends Controller {
  static values = {apiKey: String, mapId: String};

  initialize() {
    this.loader = new Loader({ apiKey: this.apiKeyValue, version: "weekly" });
    navigator.geolocation.getCurrentPosition((geolocationPosition) => {
      this.position =  { lat: geolocationPosition.coords.latitude, lng: geolocationPosition.coords.longitude };
    }, () => {
      this.position =  { lat: -34.397, lng: 150.644 };
    })
  }

  connect() {
    const intervalId = setInterval(() => {
      if (this.position) {
       clearInterval(intervalId);
      }
    }, 1000);

    this.loader.load().then(async () => {
      const { Map } = await google.maps.importLibrary("maps");
      const { PinElement, AdvancedMarkerElement } = await google.maps.importLibrary("marker");
      this.map = new Map(this.element, {
        center: this.position,
        zoom: 14,
        mapId: this.mapIdValue,
      });
      const currentPositionPin = new PinElement({
        background: '#00008B',
        glyphColor: '#87CEEB',
        borderColor: '#87CEEB',
      });
      const marker = new AdvancedMarkerElement({
        map: this.map,
        position: this.position,
        title: 'Uul',
        content: currentPositionPin.element,
      })
    });
  }
}
