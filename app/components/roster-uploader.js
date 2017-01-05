import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
		uploadRoster(event) {
			const file = event.testingFile || event[0];
			console.log('File: ', file);
		}
	}
});
