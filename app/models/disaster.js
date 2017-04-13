import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
	name: DS.attr('string'),
	sites: DS.hasMany('site'),
	slug: Ember.computed('name', function() { return this.get('name').dasherize(); }),
	
	volunteersNotCheckedInArray: Ember.computed.mapBy('sites', 'notCheckInCount'),
	volunteersCheckedInArray: Ember.computed.mapBy('sites', 'checkInCount'),
	volunteersCheckedOutArray: Ember.computed.mapBy('sites', 'checkOutCount'),

	volunteersNotCheckedIn: Ember.computed.sum('volunteersNotCheckedInArray'),
	volunteersCheckedIn: Ember.computed.sum('volunteersCheckedInArray'),
	volunteersCheckedOut: Ember.computed.sum('volunteersCheckedOutArray'),

	hasNotCheckIns: Ember.computed.gt('volunteersNotCheckedIn', 0),
	hasCheckIns: Ember.computed.gt('volunteersCheckedIn', 0),
	hasCheckOuts: Ember.computed.gt('volunteersCheckedOut', 0)
});
