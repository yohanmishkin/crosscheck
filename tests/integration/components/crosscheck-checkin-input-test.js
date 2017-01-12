import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('crosscheck-checkin-input', 'Integration | Component | crosscheck checkin input', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{crosscheck-checkin-input}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#crosscheck-checkin-input}}
      template block text
    {{/crosscheck-checkin-input}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
