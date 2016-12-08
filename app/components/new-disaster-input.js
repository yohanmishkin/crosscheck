import Ember from 'ember';

export default Ember.Component.extend({
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
