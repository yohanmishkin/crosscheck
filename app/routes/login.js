import Ember from 'ember';

export default Ember.Route.extend({
    session: Ember.inject.service(),
    beforeModel() {
        return this.get('session').fetch().catch(() => {});
    },
    actions: {
        login() {
            this.get('session')
                .open('firebase', {
                    provider: 'password',
                    email: 'email@gmail.com',
                    password: 'password'
                }).then(data => {
                    /* setting uid in service for later retrieval elsewhere */
                    debugger;
                    this.transitionTo('disasters');
                });
        },
        signOut() {
            this.get('session').close().then(() => this.transitionTo('application'));
        }
    }
});
