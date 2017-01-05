import Ember from 'ember';

function createFile(content = ['test']) {
    const file = new Blob(content, {type: 'text/csv'});
    file.name = 'roster.csv';
    return file;
}

export default Ember.Test.registerHelper('uploadFile', function(app, selector, content) {
    const file = createFile(content);
    return triggerEvent(
        selector,
        'change',
        { testingFile: [file] }
    );
});
