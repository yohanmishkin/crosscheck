import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('disasters', function() {
    this.route('new');
    this.route('edit', { path: '/:disaster_id' }, function() {
      this.route('checkin', { path: '/checkin' });
      this.route('new', { path: '/sites/new' });
      this.route('site', { path: '/sites/:workSite_id' });
    });
  });
});

export default Router;
