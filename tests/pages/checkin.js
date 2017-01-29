import {
  create,
  visitable,
  fillable,
  clickable
} from 'ember-cli-page-object';

export default create({
  visit: visitable(`/disasters/:disaster_id/checkin`),
  memberNumber: fillable('.checkin-member-number'),
  submit: clickable('.checkin-submit')
});
