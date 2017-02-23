import Ember from 'ember';
import gMaps from 'ember-cli-g-maps/components/g-maps';

const { computed, isPresent } = Ember;

export default gMaps.extend({
  defaultGMapState: computed(function() {
    const markers = this.get('markers').filter((marker) => {
    debugger;
      return isPresent(marker.lat) && isPresent(marker.lng);
    });

    if (markers.length > 0 && (typeof FastBoot === 'undefined')) {
      const map = this.get('map');
      const bounds = new google.maps.LatLngBounds();
      const points = markers.map((marker) => {
        return new google.maps.LatLng(marker.lat, marker.lng);
      });

      points.forEach((point) => bounds.extend(point));
      map.fitBounds(bounds);
    }
  })
});