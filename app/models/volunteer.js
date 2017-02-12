import DS from 'ember-data';

export default DS.Model.extend({
    memberNumber: DS.attr('number'),
    latitude: DS.attr('number'),
    longitude: DS.attr('number'),
    isCheckedIn: DS.attr('boolean'),
    site: DS.belongsTo('site')
});
