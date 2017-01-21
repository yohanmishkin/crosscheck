import Ember from 'ember';

export default Ember.Route.extend({
    geolocation: Ember.inject.service(),

    model() {
        return this.get('store').createRecord('checkin');
    },
    
    actions: {
        save(checkin) {
            this.get('geolocation').getLocation().then(function(geoObject) {
                let currentLocation = this.get('geolocation').get('currentLocation');
            debugger;
                checkin.set('geoLocation', currentLocation);
                return checkin.save();
            });
        }
    }
});
