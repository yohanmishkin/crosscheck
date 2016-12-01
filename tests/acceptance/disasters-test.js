import { test } from 'qunit';
import moduleForAcceptance from 'crosscheck/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | disasters');

test('visiting /disasters, no disasters', function(assert) {
  visit('/disasters');

  andThen(function() {
    assert.equal(currentURL(), '/disasters');
    assert.equal(find('.test-disasters-header').length, 1, 'header appears');
    assert.equal(find('.test-disasters-create-new').length, 1, 'create new link is visible');
    assert.equal(find('.test-disasters-table > tr').length, 0, 'no disasters visible');
  });
});
