import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		return this.get('store').createRecord('disaster');
	},
	actions: {
		save(disaster) {
			let self = this;
			disaster.save().then(() => {
				self.transitionTo('disasters');
			});
		},
		cancel(disaster) {
			disaster.deleteRecord();
			this.transitionTo('disasters');
		}
	}
});
