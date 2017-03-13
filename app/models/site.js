import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr('string'),
	location: DS.attr('string'),
	lat: DS.attr('number'),
	lng: DS.attr('number'),
	
	disaster: DS.belongsTo('disaster'),
	volunteers: DS.hasMany('volunteer'),
	checkins: Ember.computed.filterBy('volunteers', 'isCheckedIn', true),
	noCheckins: Ember.computed.filterBy('volunteers', 'isCheckedIn', false),
	hasNoCheckins: Ember.computed.empty('checkins'),
	hasCheckins: Ember.computed.not('hasNoCheckins'),
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
