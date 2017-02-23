import Ember from 'ember';

export default Ember.Controller.extend({
    gMap: Ember.inject.service(),
    markers: Ember.computed('model.sites.[]', function(){
        return this.get('model.sites').mapBy('marker');
    })
});
