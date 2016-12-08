import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
	name(i) {
		let prefix = faker.list.random('Hurricane', 'Earthquake', 'Fire')(i);
		return `${prefix} ${faker.name.firstName()}`;
	}
});
