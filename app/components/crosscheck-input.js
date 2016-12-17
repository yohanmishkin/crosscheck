import Ember from 'ember';

export default Ember.Component.extend({
	model: {},
	actions: {
		save() {
			let model = this.get('model');
			this.get('save')(model);
		},
		cancel() {
			let model = this.get('model');
			this.get('cancel')(model);
		}
	}
});
