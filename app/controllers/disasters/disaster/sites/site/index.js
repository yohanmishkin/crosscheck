import Ember from 'ember';

export default Ember.Controller.extend({
    session: Ember.inject.service(),
    gMap: Ember.inject.service(),
    markers: Ember.computed.mapBy('model.volunteers', 'marker')
});
