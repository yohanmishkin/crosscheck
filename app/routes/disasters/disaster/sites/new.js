import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		return this.get('store').createRecord('site');
	},
	actions: {
		savesite(site) {
			let self = this;
			let disaster = this.modelFor('disasters.disaster');
			disaster.get('sites').pushObject(site);
			site.save().then(() => {
				disaster.save();
				self.transitionTo('disasters.disaster', disaster.get('id'));
			});
		},
		cancel() {
			console.log('Cancel on route');
		}
	}
});
