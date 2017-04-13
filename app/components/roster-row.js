import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        checkIn(volunteer) {
            volunteer.set('isCheckedIn', true);
            volunteer.set('timeCheckedIn', new Date());
            this.get('checkIn')(volunteer);
        },
        checkOut(volunteer) {
            volunteer.set('isCheckedOut', true);
            volunteer.set('timeCheckedOut', new Date());            
            this.get('checkOut')(volunteer);
        }
    }
});
