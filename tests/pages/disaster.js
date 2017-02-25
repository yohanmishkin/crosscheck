import {
  create,
  visitable,
  clickable
} from 'ember-cli-page-object';

export default create({
  visit: visitable('/disasters/:disaster_id'),
  site: clickable('.test-site-link'),
  newSite: clickable('.test-disaster-create-site')
});
