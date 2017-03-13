import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
    memberNumber() {
        return faker.random.number();
    },
    latitude() {
        return faker.address.latitude();
    },
    longitude() {
        return faker.address.longitude();
    },
    isCheckedIn() { 
        return faker.random.boolean(); 
    }
});
