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
			debugger;
			let reader = new FileReader();
			reader.onloadend = function() {
				// console.log(reader.result);
				let csv = reader.result;
				let data = $.csv.toArrays(csv);
				for (var row in data) {
					console.log('rooooooooow');
				}
				// foreach (var record in reader.result) {
					// create sites
					// create volunteers
				//}	
			};

			reader.readAsText(event[0]);
			// Post file to API /disasters/:id/upload
			// Reload store
		}
	}
});
