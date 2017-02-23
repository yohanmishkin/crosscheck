import { Factory,faker } from 'ember-cli-mirage';

export default Factory.extend({
    name() {
        return faker.address.streetName();
    },
    lat() {
        return faker.address.latitude();
    },
    lng() {
        return faker.address.longitude();
    },
    location() {
        return faker.address.streetAddress();
    }
});
