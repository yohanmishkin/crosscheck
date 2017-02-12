import { test } from 'qunit';
import moduleForAcceptance from 'crosscheck/tests/helpers/module-for-acceptance';
import page from 'crosscheck/tests/pages/disaster';
import sitePage from 'crosscheck/tests/pages/site';

moduleForAcceptance('Acceptance | disasters/edit/sites');

test('Can navigate to site page', function(assert) {
  let disaster = server.create('disaster', { name: 'Hurricane Daniel', slug: 'hurricane-daniel' });
  let site = server.create('site', { name: 'Ticonderoga', location: '12 Candy Lane', disaster });

  page
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

  sitePage
    .visit({disaster_id: disaster.id, site_id: site.id})
    .checkin();

  andThen(function() {
    assert.equal(currentURL(), `/disasters/${disaster.id}/sites/${site.id}/checkin`, 'Navigated to site checkin page');
  });

  fillIn('.checkin-member-number', '121212');
  click('.checkin-submit');
});