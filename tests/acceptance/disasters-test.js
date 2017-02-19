import { test,skip } from 'qunit';
import moduleForAcceptance from 'crosscheck/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | disasters');

test('visiting /disasters, no disasters', function(assert) {
  visit('/');

  andThen(() => {
    assert.equal(currentURL(), '/');
    assert.equal(find('.test-disasters-header').length, 1, 'header appears');
    assert.equal(find('.test-disaster-create-new').length, 1, 'create new link is visible');
    assert.equal(find('.test-disasters-table > tr').length, 0, 'no disasters visible');
  });
});

test('create new disaster', function(assert) {
	visit('/');

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
		assert.equal(currentURL(), '/', 'transitioned back to /');
	});

	click('.test-disaster-create-new');
	fillIn('.test-model-name-input', 'Hurricane Chad');
	keyEvent('.test-model-name-input', 'keyup', 13);

	andThen(() => {
		assert.equal(find('.test-disasters-list > li').length, 2, 'disaster added to the list using enter keypress');
	});
});

test('quit creating new disaster and return to existing disasters', function(assert) {
	visit('/');

	click('.test-disaster-create-new');
	fillIn('.test-model-name-input', 'Hurricane Dandy');
	click('.test-model-cancel-new');

	andThen(() => {
		assert.equal(currentURL(), '/', 'transitioned back to /');
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

	visit('/');

	click('.test-disasters-list > li > a:first');
	
	andThen(() => {
		assert.equal(currentURL(), `/disasters/${disaster.id}`, 'Navigated to edit page');
		assert.equal(find('.test-disaster-edit-name').text().trim(), 'Hurricane Charles', 'Name is displayed on edit page');
		assert.equal(find('.test-disaster-create-site').text(), 'Create first work site', 'Work site placeholder visible');
	});

	click('.test-disaster-create-site');

	andThen(() => {
		assert.equal(currentURL(), `/disasters/${disaster.id}/sites/new`, 'Redirects to new route');
		assert.equal(find('.test-new-site-header').length, 1, 'New site header visible');
	});

	fillIn('.test-model-name-input', 'Area 51');
	fillIn('.test-site-location-input', 'NYC');
	selectAutocompletePlace(/* placeResultIndex, autocompleteSelector */); // selects 1st place result	
	click('.test-site-save');

	andThen(() => {
		assert.equal(currentURL(), `/disasters/${disaster.id}`, 'transitioned back to edit');
		assert.equal(find('.test-sites-list > li').length, 1, 'new site added to the site list');
		assert.equal(find('.test-sites-list > li > a:first').text().trim(), 'Area 51', 'site name seen in table');
		assert.equal(server.db.sites[0].location, 'NYC, NY, United States', 'site location was saved');
	});

	click('.test-disasters-header');

	andThen(() => {
		assert.equal(currentURL(), '/', 'Clicking header returns to /');
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