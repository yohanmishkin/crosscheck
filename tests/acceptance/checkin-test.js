import { test } from 'qunit';
import moduleForAcceptance from 'crosscheck/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | checkin');

test('visiting /checkin', function(assert) {
  visit('/checkin');

  andThen(function() {
    assert.equal(currentURL(), '/checkin');
  });
});
