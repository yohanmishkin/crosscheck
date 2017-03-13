import Ember from 'ember';

export default Ember.Controller.extend({
    gMap: Ember.inject.service(),
    markers: Ember.computed.mapBy('model.volunteers', 'marker')
});
