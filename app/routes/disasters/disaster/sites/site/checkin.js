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

                let site = this.modelFor('disasters.disaster.sites.site');
                volunteer.set('site', site);
                
                site.save().then(() => {
                    volunteer.save().then(() => {
                        return this.transitionTo('disasters.disaster', this.modelFor('disasters.disaster').get('id'));
                    });
                });
            }, (reason) => {
                console.log(`Geolocation failed: ${reason}`);
            });
        }
    }
});
