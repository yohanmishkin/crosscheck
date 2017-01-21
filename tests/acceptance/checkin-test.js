import { test } from 'qunit';
import moduleForAcceptance from 'crosscheck/tests/helpers/module-for-acceptance';
import page from 'crosscheck/tests/pages/checkin';

moduleForAcceptance('Acceptance | checkin');

test('Volunteer can checkin', function(assert) {
  page
    .visit()
    .memberNumber('121212')
    .submit();

  andThen(function() {
    let db = server.schema.db;
    let checkin = db.checkins[0];
    assert.ok(checkin, 'checkin logged');
    assert.ok(checkin.geoLocation, 'checkin location logged');
    assert.equal(find('.worksites-list > tr').length, 1, 'Worksite visible');
  });
});
