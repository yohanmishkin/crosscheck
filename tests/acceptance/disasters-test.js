import { test } from 'qunit';
import moduleForAcceptance from 'crosscheck/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | disasters');

test('visiting /disasters, no disasters', function(assert) {
  visit('/disasters');

  andThen(() => {
    assert.equal(currentURL(), '/disasters');
    assert.equal(find('.test-disasters-header').length, 1, 'header appears');
    assert.equal(find('.test-disasters-create-new').length, 1, 'create new link is visible');
    assert.equal(find('.test-disasters-table > tr').length, 0, 'no disasters visible');
  });
});

test('can create new disaster', function(assert) {
	visit('/disasters');

	click('.test-disasters-create-new');
	fillIn('.test-disaster-name-input', 'Hurricane Dandy');
	click('.test-disasters-create-new-submit');

	andThen(() => {
		assert.equal(find('.test-disasters-table > tr').length, 1, 'disaster added to the table');
		assert.equal(find('.test-disasters-table > tr:first').text(), 'Hurricane Dandy', 'disaster name seen in table');
	});
});