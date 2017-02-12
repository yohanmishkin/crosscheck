import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr('string'),
	location: DS.attr('string'),
	disaster: DS.belongsTo('disaster'),
	volunteers: DS.hasMany('volunteer'),
	checkins: Ember.computed.filterBy('volunteers', 'isCheckedIn', true),
	hasNoCheckins: Ember.computed.empty('checkins'),
	hasCheckins: Ember.computed.not('hasNoCheckins'),
	slug: Ember.computed('name', function() {
		return this.get('name').dasherize();
	})
});
