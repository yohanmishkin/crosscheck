import Ember from 'ember';

export default Ember.Route.extend({
    geolocation: Ember.inject.service(),

    model() {
        return this.get('store').createRecord('checkin');
    },
    
    actions: {
        save(checkin) {
            this.get('geolocation').getLocation().then((geoObject) => {
                let currentLocation = this.get('geolocation').get('currentLocation');
                checkin.set('geoLocation', currentLocation);
                return checkin.save();
            }, (reason) => {
                console.log(`Geolocation failed: ${reason}`);
            });
        }
    }
});
