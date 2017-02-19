import Ember from 'ember';
import Application from '../../app';
import config from '../../config/environment';
import registerAsyncHelpers from '../helpers/ember-cli-g-maps/register-async-helpers';

export default function startApp(attrs) {
  let application;

  // use defaults, but you can override
  let attributes = Ember.assign({}, config.APP, attrs);

  Ember.run(() => {
    application = Application.create(attributes);
    registerAsyncHelpers(); // call here
    application.setupForTesting();
    application.injectTestHelpers();
  });

  return application;
}
