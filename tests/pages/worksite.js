import {
  create,
  visitable,
  clickable
} from 'ember-cli-page-object';

export default create({
  visit: visitable('/disasters/:disaster_id/sites/:workSite_id'),
  checkin: clickable('.test-worksite-checkin')
});
