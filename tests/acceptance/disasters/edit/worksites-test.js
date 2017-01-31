import { test } from 'qunit';
import moduleForAcceptance from 'crosscheck/tests/helpers/module-for-acceptance';
import page from 'compass/tests/pages/disaster';

moduleForAcceptance('Acceptance | disasters/edit/worksites');

test('Can navigate to worksite page', function(assert) {
  let disaster = server.create('disaster', { name: 'Hurricane Daniel' });
  server.create('workSite', { name: 'Ticonderoga', disaster });

  page
    .visit({disaster_id: disaster.id})
    .worksite();
  
  andThen(function() {
    assert.equal(currentURL(), '/disasters/hurricane-daniel/sites/ticonderoga');
  });
});
