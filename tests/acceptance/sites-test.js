import Ember from 'ember';
import { test } from 'qunit';
import moduleForAcceptance from 'crosscheck/tests/helpers/module-for-acceptance';
import disasterPage from 'crosscheck/tests/pages/disaster';
import sitePage from 'crosscheck/tests/pages/site';
import checkinPage from 'crosscheck/tests/pages/checkin';
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

  checkinPage
    .memberName('Charles Beasley Sines')
    .memberNumber('121212')
    .memberPhone('123-456-7899')
    .memberGap('Supervisor')
    .submit();

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

test('View volunteers roster on site', function(assert) {
  let volunteers = server.createList('volunteer', 2);
  let disaster = server.create('disaster');
	let site = server.create('site', { disaster, volunteers });

  sitePage
    .visit({
      disaster_id: disaster.id, 
      site_id: site.id
    });

  andThen(() => {
    assert.ok(find('.test-roster'), 'Roster header appears');
    assert.equal(find('.test-volunteer-list > li').length, 2, 'List of volunteers visible');
  });
});

test('No roster appears on site without volunteers', function(assert) {
  let disaster = server.create('disaster');
	let site = server.create('site', { disaster, volunteers: null });

  sitePage
    .visit({
      disaster_id: disaster.id, 
      site_id: site.id
    });

  andThen(() => {
    assert.notOk(find('.test-roster').length > 0, 'Roster header doesnt appear');
    assert.notOk(find('.test-volunteer-list').length > 0, 'Volunteer list doesnt appear');
  });

});