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
				let data = Ember.$.csv.toArrays(csv);
				
				for (var row in data) {
					if (row === 0) { // headers
						continue;
					}

					let tempSiteName = data[row][0];
					if (tempSiteName && tempSiteName !== 'Shift Name') {

						let existingSite = self.get('currentModel.sites')
							.filterBy('name', tempSiteName)
							.get('firstObject');

						if (!existingSite) {
							existingSite = self.get('store').createRecord('site', {
								name: tempSiteName,
								location: 'NYC'
							});
							self.get('currentModel.sites').pushObject(existingSite);
						}

						let tempName = data[row][5];
						let tempStatus = data[row][7];
						let tempPhone = data[row][9];
						if (tempName) {
							let volunteer = self.get('store').createRecord('volunteer', {
								name: tempName,
								status: tempStatus,
								phone: tempPhone
							});

							existingSite.get('volunteers').pushObject(volunteer);

							self.get('save')(volunteer, existingSite);
						}
					}
				}
			};

			reader.readAsText(event[0]);
		}
	},

	save(volunteer, existingSite) {
		return volunteer.save().then(() => {
			return existingSite.save();
		});
	}
});
