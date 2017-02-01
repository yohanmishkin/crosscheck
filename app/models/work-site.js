import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr('string'),
	location: DS.attr('string'),
	disaster: DS.belongsTo('disaster'),
	slug: Ember.computed('name', function() { return this.get('name').dasherize(); })
});
