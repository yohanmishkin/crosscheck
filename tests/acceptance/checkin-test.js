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
    assert.equal(server.db.checkins.length, 1, 'checkin created');
    assert.equal(find('.worksites-list > tr').length, 1, 'Worksite visible');
  });
});
