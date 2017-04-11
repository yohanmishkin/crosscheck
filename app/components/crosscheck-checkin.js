import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        save(volunteer) {
            this.get('save')(volunteer);
        }
    }
});
