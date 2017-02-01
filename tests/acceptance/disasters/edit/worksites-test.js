import Ember from 'ember';
import { test } from 'qunit';
import moduleForAcceptance from 'crosscheck/tests/helpers/module-for-acceptance';
import page from 'crosscheck/tests/pages/disaster';
import { register } from 'ember-owner-test-utils/test-support/register';

const { Service } = Ember;

moduleForAcceptance('Acceptance | disasters/edit/worksites');

test('Can navigate to worksite page and checkin', function(assert) {
  let disaster = server.create('disaster', { name: 'Hurricane Daniel', slug: 'hurricane-daniel' });
  server.create('workSite', { name: 'Ticonderoga', location: '12 Candy Lane', disaster });

  let mockCoordinates = {
    coords: {
      latitude:40.7686973,
      longitude:-73.9918181
    },
    timestamp: 1234
  };

  register(this, 'service:geolocation', Service.extend({
    getLocation() {
      return new Ember.RSVP.Promise((resolve) => { 
        resolve({Position: mockCoordinates});
      });
    }
  }));

  page
    .visit({disaster_slug: disaster.slug})
    .worksite();
  
  andThen(function() {
    assert.equal(currentURL(), '/disasters/hurricane-daniel/sites/ticonderoga', 'Navigated to worksite page');
    assert.equal(find('.test-work-site-name').text(), 'Ticonderoga', 'Worksite name displayed');
    assert.equal(find('.test-work-site-location').text(), '12 Candy Lane', 'Worksite location displayed');
  });

  click('.test-worksite-checkin');
  fillIn('.checkin-member-number', '121212');
  click('.checkin-submit');

  andThen(() => {
    assert.equal(server.db.checkins.length, 1, 'Checkin saved');
    assert.equal(currentURL(), '/disasters/hurricane-daniel', 'Redirects back to site');
  });
});
