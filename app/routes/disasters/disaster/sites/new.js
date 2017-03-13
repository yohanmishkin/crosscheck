import Ember from 'ember';

export default Ember.Route.extend({
	isSaved: false,
	model() {
		return this.get('store').createRecord('site');
	},
	deactivate() {
		if (!this.get('isSaved'))
			this.get('currentModel').deleteRecord();
	},
	actions: {
		savesite(site) {
			let self = this;
			let disaster = this.modelFor('disasters.disaster');
			disaster.get('sites').pushObject(site);
			site.save().then(() => {
				disaster.save();
				self.set('isSaved', true);
				self.transitionTo('disasters.disaster', disaster.get('id'));
			});
		},
		cancel() {
			console.log('Cancel on route');
		}
	}
});
