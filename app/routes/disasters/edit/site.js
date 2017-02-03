import Ember from 'ember';

export default Ember.Route.extend({
    model(params) {
		return this.get('store').findRecord('workSite', params.workSite_id);
		// console.log('Slug: ', params.workSite_slug);
		// return this.get('store').query('workSite', { filter: { slug: params.workSite_slug }})
		// 	.then(workSites => {
		// 		return workSites.get('firstObject');
		// 	});
	},
	serialize(workSite) {
		return {
			workSite_slug: workSite.get('slug')
		};
	}
});
