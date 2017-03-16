import Ember from 'ember';
import { test } from 'qunit';
import { register } from 'ember-owner-test-utils/test-support/register';
import moduleForAcceptance from 'crosscheck/tests/helpers/module-for-acceptance';
import disasterPage from 'crosscheck/tests/pages/disaster';
import sitePage from 'crosscheck/tests/pages/site';
import checkinPage from 'crosscheck/tests/pages/checkin';

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

  andThen(() => {
    assert.equal(currentURL(), `/disasters/${disaster.id}`, 'Navigated back to site disaster page');
    assert.equal(find('.test-site-checkins').text(), 1, 'Checkin badge incremented');
    assert.equal(server.db.volunteers[0].siteId, site.id, 'volunteer were added to site');
  });

  sitePage
    .visit({disaster_id: disaster.id, site_id: site.id});

  andThen(function() {
    assert.equal(find('.test-volunteer-member-name').text(), 'Charles Beasley Sines', 'Member name visible');
    assert.equal(find('.test-volunteer-member-status').text(), 'Supervisor', 'Member status visible');
    assert.equal(find('.test-volunteer-member-number').text(), '121212', 'Member number visible');
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
  let volunteers = server.createList('volunteer', 1, {
    name: "volunteerName",
    status: 'statusCode',
    memberNumber: "1234",
    isCheckedIn: false
  });
  let disaster = server.create('disaster');
	let site = server.create('site', { disaster, volunteers });

  sitePage
    .visit({
      disaster_id: disaster.id, 
      site_id: site.id
    });

  andThen(() => {
    assert.ok(find('.test-roster'), 'Roster header appears');
    assert.equal(find('.test-roster-row').length, 1, 'List of volunteers visible');
    assert.equal(find('.test-volunteer-member-name').text(), 'volunteerName', 'Member name visible');
    assert.equal(find('.test-volunteer-member-status').text(), 'statusCode', 'Member status visible');
    assert.equal(find('.test-volunteer-member-number').text(), '1234', 'Member number visible');
  });

  sitePage
    .visit({
      disaster_id: disaster.id, 
      site_id: site.id
    })
    .checkin();

  checkinPage
    .memberName('Charles Beasley Sines')
    .memberNumber('121212')
    .memberPhone('123-456-7899')
    .memberGap('Supervisor')
    .submit();

    andThen(() => {
      assert.equal(currentURL(), `/disasters/${disaster.id}`, 'Navigated to site page');
      assert.equal(find('.test-site-checkins').text().trim(), 1, 'checkins badge looks good');
      assert.equal(find('.test-site-no-checkins').text().trim(), 1, 'no checkins badge looks good');
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
    assert.equal(find('.test-roster-row').length, 0, 'Volunteer list doesnt appear');
  });
});

test('View volunteer map on site page', function(assert) {
  let volunteers = server.createList('volunteer', 1, {
    latitude:40.7686973,
    longitude:-73.9918181
  });
  let disaster = server.create('disaster');
	let site = server.create('site', { disaster, volunteers });

  sitePage
    .visit({
      disaster_id: disaster.id, 
      site_id: site.id
    });

  andThen(() => {
    assert.ok(find('.test-volunteer-map').length, 1, 'Volunteer map appears');
  });
});