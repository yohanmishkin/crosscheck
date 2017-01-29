import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
	name: DS.attr('string'),
	workSites: DS.hasMany('workSite'),
	slug: Ember.computed('name', function() { return this.get('name').dasherize(); })
});
