import { test } from 'qunit';
import moduleForAcceptance from 'crosscheck/tests/helpers/module-for-acceptance';
import page from 'crosscheck/tests/pages/index';

moduleForAcceptance('Acceptance | index');

test('Homepage links work', function(assert) {
  page
    .visit()
    .checkin();

  andThen(function() {
    assert.equal(currentURL(), '/checkin');
  });

  page
    .visit()
    .disasters();

  andThen(function() {
    assert.equal(currentURL(), '/disasters');
  });
});
