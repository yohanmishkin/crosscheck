import Ember from 'ember';

export default Ember.Route.extend({
    session: Ember.inject.service(),
    beforeModel() {
        return this.get('session').fetch().catch(() => {});
    },
    actions: {
        logIn() {
            let controller = this.get('controller');
            this.get('session')
                .open('firebase', {
                    provider: 'password',
                    email: controller.get('email'),
                    password: controller.get('password')
                }).then(data => {
                    console.log(data);
                    this.transitionTo('disasters');
                });
        }
    }
});
