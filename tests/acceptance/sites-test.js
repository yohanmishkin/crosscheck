import Ember from 'ember';
import { test } from 'qunit';
import moduleForAcceptance from 'crosscheck/tests/helpers/module-for-acceptance';
import disasterPage from 'crosscheck/tests/pages/disaster';
import sitePage from 'crosscheck/tests/pages/site';
import { register } from 'ember-owner-test-utils/test-support/register';

const { Service } = Ember;

moduleForAcceptance('Acceptance | disasters/edit/sites');

test('Can navigate to site page', function(assert) {
  let disaster = server.create('disaster', { name: 'Hurricane Daniel', slug: 'hurricane-daniel' });
  let site = server.create('site', { name: 'Ticonderoga', location: '12 Candy Lane', disaster });

  disasterPage
    .visit({disaster_id: disaster.id})
    .site();
  
  andThen(function() {
    assert.equal(currentURL(), `/disasters/${disaster.id}/sites/${site.id}`, 'Navigated to site page');
    assert.equal(find('.test-site-name').text(), 'Ticonderoga', 'site name displayed');
    assert.equal(find('.test-site-location').text(), '12 Candy Lane', 'site location displayed');
  });
});

test('Volunteer can check into site', function(assert) {
  let disaster = server.create('disaster', { name: 'Hurricane Daniel', slug: 'hurricane-daniel' });
  let site = server.create('site', { name: 'Ticonderoga', location: '12 Candy Lane', disaster });

  let coords = {
    latitude:40.7686973,
    longitude:-73.9918181
  };

  register(this, 'service:geolocation', Service.extend({
    getLocation() {
      return new Ember.RSVP.Promise((resolve) => { 
        resolve({coords});
      });
    }
  }));

  sitePage
    .visit({disaster_id: disaster.id, site_id: site.id})
    .checkin();

  andThen(function() {
    assert.equal(currentURL(), `/disasters/${disaster.id}/sites/${site.id}/checkin`, 'Navigated to site checkin page');
  });

  fillIn('.checkin-member-number', '121212');
  click('.checkin-submit');

  andThen(function() {
    assert.equal(currentURL(), `/disasters/${disaster.id}`, 'Navigated back to site disaster page');
    assert.equal(find('.test-site-checkins').text(), 1, 'Checkin badge incremented');
  });
});

test('Deactivates model if you navigate away from new site page', function(assert) {
	let disaster = server.create('disaster');
	server.create('site', { disaster });

	disasterPage
		.visit({disaster_id: disaster.id})
		.newSite();
    
	click('.test-disasters-header');

	andThen(() => {
		let store = this.application.__container__.lookup('service:store');
		let sites = store.peekAll('site');
		assert.equal(sites.get('length'), 1, 'New site was discarded');
	});
});
