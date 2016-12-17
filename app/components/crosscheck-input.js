import Ember from 'ember';

export default Ember.Component.extend({
	model: {},
	actions: {
		create() {
			let model = this.get('model');
			this.get('save')(model);
		},
		cancel() {
			this.get('cancel')();
		}
	}
});
