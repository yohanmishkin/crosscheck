import Ember from 'ember';

export default Ember.Route.extend({
    geolocation: Ember.inject.service(),

    model() {
        return this.get('store').createRecord('volunteer');
    },
    
    actions: {
        save(checkin) {
            this.get('geolocation').getLocation().then((loc) => {
                checkin.set('latitude', loc.coords.latitude);
                checkin.set('longitude', loc.coords.longitude);
                checkin.set('isCheckedIn', true);
                checkin.save().then(() => {
                    this.transitionTo('disasters.edit', this.modelFor('disasters.edit').get('slug'));
                });
            }, (reason) => {
                console.log(`Geolocation failed: ${reason}`);
            });
        }
    }
});
