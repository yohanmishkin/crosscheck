import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    status: DS.attr('string'),
    memberNumber: DS.attr('number'),
    latitude: DS.attr('number'),
    longitude: DS.attr('number'),
    isCheckedIn: DS.attr('boolean'),
    site: DS.belongsTo('site'),
    marker: Ember.computed('latitude', 'longitude', function() {
		return {
			id: this.get('id'),
			lat: this.get('latitude'),
			lng: this.get('longitude')
		};
	})
});
