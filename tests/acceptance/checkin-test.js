import { skip } from 'qunit';
import moduleForAcceptance from 'crosscheck/tests/helpers/module-for-acceptance';
// import Ember from 'ember';
// import page from 'crosscheck/tests/pages/checkin';
// import { register } from 'ember-owner-test-utils/test-support/register';
// const { Service } = Ember;

moduleForAcceptance('Acceptance | disasters/edit/checkin');

skip('visiting /disasters/edit/checkin', function(assert) {
  
  let disaster = server.create('disaster');

  visit(`/disasters/${disaster.id}`);
  click('.test-disaster-checkin');

  andThen(function() {
    assert.equal(currentURL(), `/disasters/${disaster.id}/checkin`, 'Visited correct URL');
  });
});
