import Ember from 'ember';

export default Ember.Route.extend({
	model(params) {
		return this.get('store').findRecord('disaster', params.disaster_id);
	},

	actions: {
		save() {
			let disaster = this.modelFor('disasters.disaster');
			disaster.save();
		},
        uploadRoster(event) {
			console.log(event);
			// Post file to API /disasters/:id/upload
			// Reload store
		}
	}
});
