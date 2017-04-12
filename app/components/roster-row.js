import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        checkIn() {
            this.get('save')(volunteer);
        }
    }
});
