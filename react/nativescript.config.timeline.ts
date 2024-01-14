
const mergeOptions = require('./node_modules/merge-options');

export default mergeOptions(require('./nativescript.config.logging'), {
    profiling: 'timeline'
});
