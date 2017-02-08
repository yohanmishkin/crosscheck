import Ember from 'ember';

export default Ember.Route.extend({
    geolocation: Ember.inject.service(),

    model() {
        return this.get('store').createRecord('volunteer');
    },
    
    actions: {
        save(volunteer) {
            this.get('geolocation').getLocation().then((loc) => {
                volunteer.set('latitude', loc.coords.latitude);
                volunteer.set('longitude', loc.coords.longitude);
                volunteer.set('isCheckedIn', true);
                // let workSite = this.modelFor('disasters.edit.site');
                // volunteer.set('workSite', workSite);
                volunteer.save().then(() => {
                    this.transitionTo('disasters.edit', this.modelFor('disasters.edit').get('id'));
                });
            }, (reason) => {
                console.log(`Geolocation failed: ${reason}`);
            });
        }
    }
});
