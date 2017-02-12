import Ember from 'ember';

export default Ember.Route.extend({
    model(params) {
		return this.get('store').findRecord('site', params.site_id);
		// console.log('Slug: ', params.site_slug);
		// return this.get('store').query('site', { filter: { slug: params.site_slug }})
		// 	.then(sites => {
		// 		return sites.get('firstObject');
		// 	});
	},
	serialize(site) {
		return {
			site_slug: site.get('slug')
		};
	}
});
