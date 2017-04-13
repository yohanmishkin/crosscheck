import Ember from 'ember';

export default Ember.Controller.extend({
    session: Ember.inject.service(),
    gMap: Ember.inject.service(),
    geolocation: Ember.inject.service(),
    markers: Ember.computed.mapBy('model.volunteers', 'marker'),

    actions: {
        checkIn(volunteer) {
            this.get('geolocation').getLocation().then((loc) => {
                
                volunteer.set('latitude', loc.coords.latitude);
                volunteer.set('longitude', loc.coords.longitude);
               
                let site = this.get('model');
                volunteer.set('site', site);
                
                site.save().then(() => {
                    volunteer.save();
                });
            }, (reason) => {
                console.log(`Geolocation failed: ${reason}`);
            });
        },
        checkOut(volunteer) {
            console.log('check out');
        }
    }
});
