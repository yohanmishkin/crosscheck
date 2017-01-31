import Ember from 'ember';
import { test } from 'qunit';
import moduleForAcceptance from 'crosscheck/tests/helpers/module-for-acceptance';
import page from 'crosscheck/tests/pages/checkin';
import { register } from 'ember-owner-test-utils/test-support/register';

const { Service } = Ember;

moduleForAcceptance('Acceptance | disasters/edit/checkin');

test('visiting /disasters/edit/checkin', function(assert) {
  
  let disaster = server.create('disaster');

  visit(`disasters/${disaster.id}`);
  click('.test-disaster-checkin');

  andThen(function() {
    assert.equal(currentURL(), `/disasters/${disaster.id}/checkin`, 'Visited correct URL');
  });
});

test('Volunteer can checkin', function(assert) {
  
  let disaster = server.create('disaster', { name: 'Hurricane Daniel'});
  server.createList('workSite', 3, { disaster });

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
    .visit({ disaster_id: disaster.id })
    .memberNumber('121212')
    .submit();

  andThen(function() {
    assert.equal(server.db.checkins.length, 1, 'checkin created');
  });
});
