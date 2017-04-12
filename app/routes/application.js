import Ember from 'ember';

export default Ember.Route.extend({
    session: Ember.inject.service(),
    beforeModel() {
        return this.get('session')
            .fetch()
            .catch((e) => {
                console.log(e);
                this.transitionTo('login');
            });
    },
    actions: {
        logOut() {
            this.get('session')
                .close()
                .then(() => {
                    this.transitionTo('login');
                });
        }
    }
});
