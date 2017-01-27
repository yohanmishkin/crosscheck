import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('disasters', function() {
    this.route('new');
    this.route('edit', { path: '/:disaster_id' }, function() { // TODO: Slug
      this.route('sites', function() {
        this.route('new');
      });
      // this.route('edit', { path: '/:workSiteSlug' }, () => {
      //   this.route('checkin');
      // });
    });
  });
  this.route('checkin');
});

export default Router;
