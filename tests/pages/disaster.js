import {
  create,
  visitable,
  clickable
} from 'ember-cli-page-object';

export default create({
  visit: visitable('/disasters/:disaster_slug'),
  worksite: clickable('.test-work-site-link')
});
