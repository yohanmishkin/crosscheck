import Ember from 'ember';
import { skip } from 'qunit';
import moduleForAcceptance from 'crosscheck/tests/helpers/module-for-acceptance';
import page from 'crosscheck/tests/pages/checkin';
import { register } from 'ember-owner-test-utils/test-support/register';

const { Service } = Ember;

moduleForAcceptance('Acceptance | disasters/edit/checkin');

skip('visiting /disasters/edit/checkin', function(assert) {
  
  let disaster = server.create('disaster');

  visit(`/disasters/${disaster.id}`);
  click('.test-disaster-checkin');

  andThen(function() {
    assert.equal(currentURL(), `/disasters/${disaster.id}/checkin`, 'Visited correct URL');
  });
});

skip('Volunteer can check into disaster', function(assert) {
  
  let disaster = server.create('disaster', { name: 'Hurricane Daniel'});

  let coords = {
    latitude:40.7686973,
    longitude:-73.9918181
  };

  register(this, 'service:geolocation', Service.extend({
    getLocation() {
      return new Ember.RSVP.Promise((resolve) => { 
        resolve({coords});
      });
    }
  }));

  page
    .visit({ disaster_id: disaster.id })
    .memberNumber('121212')
    .submit();

  andThen(function() {
    let volunteer = server.db.volunteers[0];
    assert.equal(volunteer.memberNumber, 121212, 'Volunteer member number saved');
    assert.equal(volunteer.latitude, 40.7686973, 'Volunteer latitude saved');
    assert.equal(volunteer.longitude, -73.9918181, 'Volunteer longitude saved');
    assert.equal(volunteer.isCheckedIn, true, 'Volunteer is checked in');
    assert.equal(currentURL(), `/disasters/${disaster.id}`, 'Redirects to disaster');
  });
});
