import { test,skip } from 'qunit';
import moduleForAcceptance from 'crosscheck/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | disasters');

test('visiting /disasters, no disasters', function(assert) {
  visit('/disasters');

  andThen(() => {
    assert.equal(currentURL(), '/disasters');
    assert.equal(find('.test-disasters-header').length, 1, 'header appears');
    assert.equal(find('.test-disaster-create-new').length, 1, 'create new link is visible');
    assert.equal(find('.test-disasters-table > tr').length, 0, 'no disasters visible');
  });
});

test('create new disaster', function(assert) {
	visit('/disasters');

	click('.test-disaster-create-new');

	andThen(() => {
		assert.equal(find('.test-disaster-create-new').length, 0, 'create new link is hidden');
		assert.equal(currentURL(), '/disasters/new', 'transitioned to /disasters/new');
	});

	fillIn('.test-model-name-input', 'Hurricane Dandy');
	click('.test-model-create-new');

	andThen(() => {
		assert.equal(find('.test-disasters-list > li').length, 1, 'disaster added to the list');
		assert.equal(find('.test-disasters-list > li:first').text().trim(), 'Hurricane Dandy', 'disaster name seen in table');
		assert.equal(currentURL(), '/disasters', 'transitioned back to /disasters');
	});

	click('.test-disaster-create-new');
	fillIn('.test-model-name-input', 'Hurricane Chad');
	keyEvent('.test-model-create-new', 'keypress', 13);

	andThen(() => {
		assert.equal(find('.test-disasters-list > li').length, 2, 'disaster added to the list using enter keypress');
	});
});

test('quit creating new disaster and return to existing disasters', function(assert) {
	visit('/disasters');

	click('.test-disaster-create-new');
	fillIn('.test-model-name-input', 'Hurricane Dandy');
	click('.test-model-cancel-new');

	andThen(() => {
		assert.equal(currentURL(), '/disasters', 'transitioned back to /disasters');
		assert.equal(find('.test-disasters-list > li').length, 0, 'disaster not added to the list');
	});

	click('.test-disaster-create-new');
	fillIn('.test-model-name-input', 'Cha cha cha');
	keyEvent('.test-model-name-input', 'keyup', 27);

	andThen(() => {
		assert.equal(find('.test-disasters-list > li').length, 0, 'disaster not added to the list after escape pressed');
	});
});

test('can create work site', function(assert) {
	let disaster = server.create('disaster', { name: 'Hurricane Charles' });

	visit('/disasters');

	click('.test-disasters-list > li:first');

	andThen(() => {
		assert.equal(currentURL(), '/disasters/hurricane-charles', 'Navigated to edit page');
		assert.equal(find('.test-disaster-edit-name').text().trim(), 'Hurricane Charles', 'Name is displayed on edit page');
		assert.equal(find('.test-disaster-create-work-site').text(), 'Create first work site', 'Work site placeholder visible');
	});

	click('.test-disaster-create-work-site');

	andThen(() => {
		assert.equal(currentURL(), `/disasters/hurricane-charles/sites/new`, 'Redirects to new route');
		assert.equal(find('.test-new-site-header').length, 1, 'New site header visible');
	});

	fillIn('.test-model-name-input', 'Area 51');
	fillIn('.test-worksite-location-input', '12 Candy Lane');
	click('.test-worksite-save');

	andThen(() => {
		assert.equal(currentURL(), `/disasters/${disaster.id}`, 'transitioned back to /disaster/edit');
		assert.equal(find('.test-sites-list > li').length, 1, 'new site added to the site list');
		assert.equal(find('.test-sites-list > li:first').text().trim(), 'Area 51', 'site name seen in table');
		assert.equal(server.db.workSites[0].location, '12 Candy Lane', 'site location was saved');
	});

	click('.test-disasters-header');

	andThen(() => {
    assert.equal(currentURL(), '/disasters', 'Clicking header returns to /disasters');
	});
});

test('can edit disaster name', function(assert) {
	let disaster = server.create('disaster', { name: 'Hurricane Charles' });
	visit(`/disasters/${disaster.id}`);

	triggerEvent('.test-disaster-edit-name', 'dblclick');
	fillIn('.test-edit-input', 'Earthquake Charles');
	keyEvent('.test-edit-input', 'keyup', 13);

	andThen(() => {
		assert.equal(find('.test-disaster-edit-name').text().trim(), 'Earthquake Charles', 'Disaster was updated');
		assert.equal(server.db.disasters[0].name, 'Earthquake Charles', 'Disaster was saved');
	});
});

skip('can upload disaster volunteer roster', function(assert) {
	let disaster = server.create('disaster', { name: 'Hurricane Charles' });
	visit(`/disasters/${disaster.id}`);

	// Find way to mock roster upload /api/disasters/:id/upload
	let roster = ['Charles Beasely Sines, MLJ4567, Disaster, Boss Lday, Putnam Station'];
	uploadFile('.test-roster-upload', roster);

	andThen(() => {
		assert.equal(1, 1);
	});
});