import { Factory,faker } from 'ember-cli-mirage';

export default Factory.extend({
    name() {
        return faker.address.streetName();
    },
    location() {
        return faker.address.streetAddress();
    }
});
