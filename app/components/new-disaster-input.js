import Ember from 'ember';

export default Ember.Component.extend({
	model: {},
	actions: {
		createDisaster() {
			let disaster = this.get('disaster');
			this.get('saveDisaster')(disaster);
		},
		cancelDisaster() {
			this.get('cancelDisaster')();
		}
	}
});
