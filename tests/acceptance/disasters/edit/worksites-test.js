import { test } from 'qunit';
import moduleForAcceptance from 'crosscheck/tests/helpers/module-for-acceptance';
import page from 'crosscheck/tests/pages/disaster';

moduleForAcceptance('Acceptance | disasters/edit/worksites');

test('Can navigate to worksite page', function(assert) {
  let disaster = server.create('disaster', { name: 'Hurricane Daniel', slug: 'hurricane-daniel' });
  server.create('workSite', { name: 'Ticonderoga', location: '12 Candy Lane', disaster });

  page
    .visit({disaster_slug: disaster.slug})
    .worksite();
  
  andThen(function() {
    assert.equal(currentURL(), '/disasters/hurricane-daniel/sites/ticonderoga', 'Navigated to worksite page');
    assert.equal(find('.test-work-site-name').text(), 'Ticonderoga', 'Worksite name displayed');
    assert.equal(find('.test-work-site-location').text(), '12 Candy Lane', 'Worksite location displayed');
  });
});
