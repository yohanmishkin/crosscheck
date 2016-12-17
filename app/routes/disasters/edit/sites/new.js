import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		return this.get('store').createRecord('workSite');
	},
	actions: {
		save(site) {
			let self = this;
			let disaster = this.modelFor('disasters.edit');
			disaster.get('workSites').pushObject(site);
			site.save().then(() => {
				disaster.save();
				self.transitionTo('disasters.edit', disaster.get('id'));
			});
		},
		cancel() {
			console.log('Cancel on route');
		}
	}
});
