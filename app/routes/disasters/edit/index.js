import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		return this.modelFor('disasters.edit');
	},
	actions: {
		uploadRoster(event) {
			console.log(event);
			// Post file to API /disasters/:id/upload
			// Reload store
		}
	}
});
