import Ember from 'ember';

export default Ember.Route.extend({
    session: Ember.inject.service(),
    beforeModel() {
        return this.get('session').fetch().catch(() => {});
    },
    actions: {
        logIn() {
            this.get('session')
                .open('firebase', {
                    provider: 'password',
                    email: 'tfjebb@gmail.com',
                    password: 'temptemp'
                }).then(data => {
                    console.log(data);
                    this.transitionTo('disasters');
                });
        },
        logOut() {
            this.get('session').close().then(() => this.transitionTo('disasters'));
        }
    }
});
