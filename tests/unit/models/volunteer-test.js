import { moduleForModel, test } from 'ember-qunit';

moduleForModel('volunteer', 'Unit | Model | volunteer', {
  // Specify the other units that are required for this test.
  needs: ['model:site']
});

test('Volunteer with name is valid', function(assert) {
  let volunteer = this.subject({
    'name': 'Charles Beasley Sines'
  });
  assert.equal(volunteer.get('isInvalid'), false);
});


test('Volunteer with member number is valid', function(assert) {
  let volunteer = this.subject({
    'memberNumber': '1234'
  });
  assert.equal(volunteer.get('isInvalid'), false);
});

test('Volunteer without name or member number is not valid', function(assert) {
  let volunteer = this.subject();
  assert.equal(volunteer.get('isInvalid'), true);
});