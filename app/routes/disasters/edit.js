import Ember from 'ember';

export default Ember.Route.extend({
	model(params) {
		return this.get('store').findRecord('disaster', params.disaster_id);
	}
});
