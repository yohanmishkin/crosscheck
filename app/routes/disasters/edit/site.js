import Ember from 'ember';

export default Ember.Route.extend({
    model(params) {
		return this.get('store').query('workSite', { filter: { slug: params.workSite_slug }})
			.then(workSites => {
				return workSites.get('firstObject');
			});
	},
	serialize(workSite) {
		return {
			workSite_slug: workSite.get('slug')
		};
	}
});
