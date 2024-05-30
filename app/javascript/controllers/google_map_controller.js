import { Controller } from "@hotwired/stimulus"
import { Loader } from "@googlemaps/js-api-loader"

// Connects to data-controller="google-map"
export default class extends Controller {
  static values = {apiKey: String};

  initialize() {
    this.loader = new Loader({ apiKey: this.apiKeyValue, version: "weekly" });
  }

  connect() {
    this.loader.load().then(async () => {
      const { Map } = await google.maps.importLibrary("maps");
      map = new Map(this.element, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });
    });
  }
}
