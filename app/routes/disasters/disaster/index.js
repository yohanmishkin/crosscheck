import Ember from 'ember';

export default Ember.Route.extend({
	model(params) {
		let disasters = this.modelFor('disasters');
		return disasters.findBy('id', params.disaster_id);
	},
	// serialize(disaster) {
	// 	return {
	// 		disaster_slug: disaster.get('slug')
	// 	};
	// },
	actions: {
		save() {
			let disaster = this.modelFor('disasters.edit');
			disaster.save();
		},
        uploadRoster(event) {
			console.log(event);
			// Post file to API /disasters/:id/upload
			// Reload store
		}
	}
});
