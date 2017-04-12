import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('roster-row', 'Integration | Component | roster row', {
  integration: true
});

test('Not checked in volunteer renders', function(assert) {

  let volunteer = Ember.Object.create({
    name: 'Charlie Sines',
    isCheckedIn: false
  });
  this.set('volunteer', volunteer);
  
  this.render(hbs`{{roster-row volunteer=volunteer}}`);

  assert.equal(this.$('.test-volunteer-time-checked-in').text().trim(), '-', 'Dash displayed for checkin time when not checked in');
  assert.ok(this.$('.test-checkin-link'), 'Checkin link appears');
});

test('Checked-in volunteer renders', function(assert) {

  let volunteer = Ember.Object.create({
    name: 'Charlie Sines',
    timeCheckedIn: new Date('2012-12-12 12:00'),
    isCheckedIn: true
  });
  this.set('volunteer', volunteer);
  
  this.render(hbs`{{roster-row volunteer=volunteer}}`);

  assert.equal(this.$('.test-volunteer-time-checked-in').text().trim(), '12:00 PM', 'Checkin time displays');
  assert.equal(this.$('.test-checkout-link').length, 1, 'Checkout link appears');
});
