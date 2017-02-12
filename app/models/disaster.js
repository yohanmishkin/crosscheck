import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
	name: DS.attr('string'),
	sites: DS.hasMany('site'),
	slug: Ember.computed('name', function() { return this.get('name').dasherize(); })
});
