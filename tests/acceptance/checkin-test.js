import { skip } from 'qunit';
import moduleForAcceptance from 'crosscheck/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | disasters/edit/checkin');

skip('visiting /disasters/edit/checkin', function(assert) {
  
  let disaster = server.create('disaster');

  visit(`/disasters/${disaster.id}`);
  click('.test-disaster-checkin');

  andThen(function() {
    assert.equal(currentURL(), `/disasters/${disaster.id}/checkin`, 'Visited correct URL');
  });
});
