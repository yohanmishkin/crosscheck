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

test('create new disaster', function(assert) {
	visit('/disasters');

	click('.test-disasters-create-new');

	andThen(() => {
		assert.equal(find('.test-disasters-create-new').length, 0, 'create new link is hidden');
		assert.equal(currentURL(), '/disasters/new', 'transitioned to /disasters/new');
	});

	fillIn('.test-disaster-name-input', 'Hurricane Dandy');
	click('.test-disasters-create-new-submit');

	andThen(() => {
		assert.equal(find('.test-disasters-list > li').length, 1, 'disaster added to the list');
		assert.equal(find('.test-disasters-list > li:first').text().trim(), 'Hurricane Dandy', 'disaster name seen in table');
		assert.equal(currentURL(), '/disasters', 'transitioned back to /disasters');
	});

	click('.test-disasters-create-new');
	fillIn('.test-disaster-name-input', 'Hurricane Chad');
	keyEvent('.test-disasters-create-new-submit', 'keypress', 13);

	andThen(() => {
		assert.equal(find('.test-disasters-list > li').length, 2, 'disaster added to the list using enter keypress');
	});
});

test('quit creating new disaster and return to existing disasters', function(assert) {
	visit('/disasters');

	click('.test-disasters-create-new');
	fillIn('.test-disaster-name-input', 'Hurricane Dandy');
	click('.test-disasters-cancel-new');

	andThen(() => {
		assert.equal(find('.test-disasters-list > li').length, 0, 'disaster not added to the list');
		assert.equal(currentURL(), '/disasters', 'transitioned back to /disasters');
	});

	click('.test-disasters-create-new');
	fillIn('.test-disaster-name-input', 'Cha cha cha');
	keyEvent('.test-disaster-name-input', 'keyup', 27);

	andThen(() => {
		assert.equal(find('.test-disasters-list > li').length, 0, 'disaster not added to the list after escape pressed');
	});
});

test('can edit disaster', function(assert) {
	let disaster = server.create('disaster', { name: 'Hurricane Charles' });

	visit('/disasters');

	click('.test-disasters-list > li:first');

	andThen(() => {
		assert.equal(currentURL(), '/disasters/' + disaster.id, 'Navigated to edit page');
		assert.equal(find('.test-disaster-edit-name').text(), 'Hurricane Charles', 'Name is displayed on edit page');
	});
});