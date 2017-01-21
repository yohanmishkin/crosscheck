import DS from 'ember-data';

export default DS.Model.extend({
  memberNumber: DS.attr('number'),
  geoLocation: DS.attr()
});
