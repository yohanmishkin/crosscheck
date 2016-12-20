import Ember from 'ember';

export default Ember.Test.registerAsyncHelper('uploadFile', function(app, selector, content) {
    return triggerEvent(
        selector,
        'change',
        { content }
    );
});
