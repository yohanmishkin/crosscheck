import Ember from 'ember';

export default Ember.Route.extend({
	model(params) {
		// return this.get('store').findRecord('disaster', params.disaster_id);
		return this.get('store').query('disaster', { filter: { slug: params.disaster_slug }})
			.then(disasters => {
				return disasters.get('firstObject');
			});
	},
	serialize(disaster) {
		return {
			disaster_slug: disaster.get('slug')
		};
	},
	actions: {
		save() {
			let disaster = this.modelFor('disasters.edit');
			disaster.save();
		}
	}
});
