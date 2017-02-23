import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        updateCoordinates({lat, lng}) {
            this.get('model').set('lat', lat);
            this.get('model').set('lng', lng);
        },

        autocompleteError(err) {
            window.alert(`Unable to find place for ${err.input}`);
        }
    }
});
