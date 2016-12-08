import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		saveDisaster(disaster) {
			let self = this;
			disaster.save().then(() => {
				self.transitionToRoute('disasters');
			});
		},
		cancelDisaster() {
			let disaster = this.get('model');
			disaster.deleteRecord();
			this.transitionToRoute('disasters');
		}
	}
});
