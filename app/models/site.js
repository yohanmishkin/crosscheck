import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr('string'),
	location: DS.attr('string'),
	lat: DS.attr('number'),
	lng: DS.attr('number'),

	disaster: DS.belongsTo('disaster'),
	volunteers: DS.hasMany('volunteer'),
	
	volunteersCheckedIn: Ember.computed.filterBy('volunteers', 'isCheckedIn', true),
	checkInCount: Ember.computed('volunteersCheckedIn', function() {
		return this.get('volunteersCheckedIn.length');
	}),
	hasCheckIns: Ember.computed.gt('checkInCount', 0),

	volunteersCheckedOut: Ember.computed.filterBy('volunteers', 'isCheckedOut', true),
	checkOutCount: Ember.computed('volunteersCheckedOut', function() {
		return this.get('volunteersCheckedOut.length');
	}),
	hasCheckOuts: Ember.computed.gt('checkOutCount', 0),
	
	volunteersNotCheckedIn: Ember.computed.filterBy('volunteers', 'isCheckedIn', false),
	notCheckInCount: Ember.computed('volunteersNotCheckedIn', function() {
		return this.get('volunteersNotCheckedIn.length');
	}),
	hasNotCheckIns: Ember.computed.gt('notCheckInCount', 0),
	
	slug: Ember.computed('name', function() {
		return this.get('name').dasherize();
	}),
	marker: Ember.computed('lat', 'lng', function() {
		return {
			id: this.get('id'),
			lat: this.get('lat'),
			lng: this.get('lng')
		};
	})
});
