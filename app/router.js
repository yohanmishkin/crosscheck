import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('disasters', { path: '/' }, function() {
    this.route('new', { path: 'disasters/new' });
    this.route('disaster', { path: 'disasters/:disaster_id' }, function() {
      this.route('sites', function() {
        this.route('new');
        this.route('site', { path: ':site_id' }, function() {
          this.route('checkin');
        });
      });
    });
  });
  this.route('login');
});

export default Router;
