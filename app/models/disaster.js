import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr('string'),
	workSites: DS.hasMany('workSite')
});
