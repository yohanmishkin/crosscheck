import {
  create,
  visitable,
  clickable
} from 'ember-cli-page-object';

export default create({
  visit: visitable('/'),
  checkin: clickable('.checkin-link'),
  disasters: clickable('.disasters-link')
});
