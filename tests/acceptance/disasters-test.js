import { test } from 'qunit';
import moduleForAcceptance from 'crosscheck/tests/helpers/module-for-acceptance';
import page from 'crosscheck/tests/pages/disaster';
import { authenticateSession } from 'crosscheck/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | disasters');

test('visiting /disasters, unauthenticated', function(assert) {
  visit('/');
  andThen(() => {
    assert.equal(currentURL(), '/');
    assert.ok(find('.login-link'), 'Login link appears');
  });
});

test('visiting /disasters, no disasters', function(assert) {
  authenticateSession(this.application);
  visit('/');

  andThen(() => {
    assert.equal(currentURL(), '/');
    assert.equal(find('.test-disasters-header').length, 1, 'header appears');
    assert.equal(find('.test-disaster-create-new').length, 1, 'create new link is visible');
    assert.equal(find('.test-disasters-table > tr').length, 0, 'no disasters visible');
  });
});

test('create new disaster', function(assert) {
  authenticateSession(this.application);
	visit('/');

	click('.test-disaster-create-new');

	andThen(() => {
		assert.equal(find('.test-disaster-create-new').length, 0, 'create new link is hidden');
		assert.equal(currentURL(), '/disasters/new', 'transitioned to /disasters/new');
	});

	fillIn('.test-model-name-input', 'Hurricane Dandy');
	click('.test-model-create-new');

	andThen(() => {
		assert.equal(find('.disaster').length, 1, 'disaster added to the list');
		assert.equal(find('.disaster').text().trim(), 'Hurricane Dandy', 'disaster name seen in table');
		assert.equal(currentURL(), '/', 'transitioned back to /');
	});

	click('.test-disaster-create-new');
	fillIn('.test-model-name-input', 'Hurricane Chad');
	keyEvent('.test-model-name-input', 'keyup', 13);

	andThen(() => {
		assert.equal(find('.disaster').length, 2, 'disaster added to the list using enter keypress');
	});
});

test('quit creating new disaster and return to existing disasters', function(assert) {
  authenticateSession(this.application);
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

	click('.test-disasters-header');

	andThen(() => {
		assert.equal(currentURL(), '/', 'Clicking header returns to /');
	});
});

test('can create work site', function(assert) {
  authenticateSession(this.application);
	let disaster = server.create('disaster', { name: 'Hurricane Charles' });

	visit('/');
	click('.test-disasters-list > a:first');
	
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
	selectAutocompletePlace();
	click('.test-site-save');

	andThen(() => {
		assert.equal(currentURL(), `/disasters/${disaster.id}`, 'transitioned back to edit');
		assert.equal(find('.test-sites-list > li').length, 1, 'new site added to the site list');
		assert.equal(find('.test-sites-list > li > a:first').text().trim(), 'Area 51', 'site name seen in table');
		let site = server.db.sites[0];
		assert.equal(site.lat.toString().slice(0,2), 40, 'lat is set');
		assert.equal(site.lng.toString().slice(0,3), -74, 'lng is set');
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

test('Disaster has map of sites', function(assert) {
	let disaster = server.create('disaster');
	server.createList('site', 5, { disaster });

	page.visit({disaster_id: disaster.id});

	andThen(() => {
		assert.equal(find('.test-site-map').length, 1, 'Map is visible');
	});
});
