import stubFirebase from '../helpers/stub-firebase';
import startApp from '../helpers/start-app';
import replaceAppRef from '../helpers/replace-app-ref';
import createOfflineRef from './create-offline-ref';
import Ember from 'ember';

export default function startFirebaseApp(fixtures = { }) {
	stubFirebase();
  let application = startApp();

  // override default torii-adapter
  const mock = { };
  application.register('service:firebaseMock', mock, {
    instantiate: false,
    singleton: true
  });
  application.inject('torii-provider:application', 'firebaseApp', 'service:firebaseMock');
  application.inject('torii-adapter:application', 'firebaseApp', 'service:firebaseMock');

  // setup any fixture data and return instance
  replaceAppRef(application, createOfflineRef(fixtures));
  return application;
}
