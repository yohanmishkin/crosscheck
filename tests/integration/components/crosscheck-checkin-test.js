import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('crosscheck-checkin', 'Integration | Component | crosscheck checkin', {
  integration: true
});

test('Checkin submit disabled with invalid volunteer', function(assert) {
  assert.expect(1);
  
  let volunteer = Ember.Object.create();
  this.set('model', volunteer);

  this.render(hbs`{{crosscheck-checkin volunteer=model}}`);

  assert.ok(this.$('button').attr("disabled", true), 'Submit button disabled');
});

test('Checkin submit enabled with valid volunteer', function(assert) {
  assert.expect(1);
  
  let volunteer = Ember.Object.create();
  volunteer.set('name', 'Charles Beasley Sines');
  this.set('model', volunteer);

  this.render(hbs`{{crosscheck-checkin volunteer=model}}`);

  assert.notOk(this.$('button').attr("disabled"), 'Submit button enabled');
});
