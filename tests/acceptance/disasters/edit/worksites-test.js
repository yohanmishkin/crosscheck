import { test } from 'qunit';
import moduleForAcceptance from 'crosscheck/tests/helpers/module-for-acceptance';
import page from 'crosscheck/tests/pages/disaster';
import workSitePage from 'crosscheck/tests/pages/worksite';

moduleForAcceptance('Acceptance | disasters/edit/worksites');

test('Can navigate to worksite page', function(assert) {
  let disaster = server.create('disaster', { name: 'Hurricane Daniel', slug: 'hurricane-daniel' });
  let site = server.create('workSite', { name: 'Ticonderoga', location: '12 Candy Lane', disaster });

  page
    .visit({disaster_id: disaster.id})
    .worksite();
  
  andThen(function() {
    assert.equal(currentURL(), `/disasters/${disaster.id}/sites/${site.id}`, 'Navigated to worksite page');
    assert.equal(find('.test-work-site-name').text(), 'Ticonderoga', 'Worksite name displayed');
    assert.equal(find('.test-work-site-location').text(), '12 Candy Lane', 'Worksite location displayed');
  });
});

test('Volunteer can check into worksite', function(assert) {
  let disaster = server.create('disaster', { name: 'Hurricane Daniel', slug: 'hurricane-daniel' });
  let site = server.create('workSite', { name: 'Ticonderoga', location: '12 Candy Lane', disaster });

  workSitePage
    .visit({disaster_id: disaster.id, workSite_id: site.id})
    .checkin();

  andThen(function() {
    assert.equal(currentURL(), `/disasters/${disaster.id}/sites/${site.id}/checkin`, 'Navigated to worksite checkin page');
  });
});