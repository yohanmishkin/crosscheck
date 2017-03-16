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
			
			let self = this;
			let reader = new FileReader();
			
			reader.onloadend = function() {
				
				let csv = reader.result;
				let data = $.csv.toArrays(csv);
				
				for (var row in data) {
					if (row === 0) { // headers
						continue;
					}

					let tempSiteName = data[row][0];
					if (tempSiteName) {
						let existingSite = self.get('currentModel.sites').mapBy('name').find((name) => { 
							return name === tempSiteName;
						});

						if (!existingSite) {
							existingSite = self.get('store').createRecord('site', {
								name: tempSiteName,
								location: 'NYC'
							});
							self.get('currentModel.sites').pushObject(existingSite);
						}

						let tempName = data[row][5];
						let tempStatus = data[row][7];
						if (tempName) {
							let volunteer = self.get('store').createRecord('volunteer', {
								name: tempName,
								status: tempStatus,
							});

							existingSite.get('volunteers').pushObject(volunteer);

							volunteer.save().then(() => {
								existingSite.save().then(() => {
									self.get('currentModel').save();
								});
							});
						}
					}
				}
			};

			reader.readAsText(event[0]);
		}
	}
});
