import Ember from 'ember';

export default Ember.Component.extend({
    isEditing: false,
    doubleClick() {
        this.set('isEditing', true);
    },
    actions: {
        save() {
            this.set('isEditing', false);
            this.get('save')(this.get('value'));
        }
    }
});
