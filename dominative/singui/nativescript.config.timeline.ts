
import mergeOptions from 'merge-options';
export default mergeOptions(require('./nativescript.config.logging'), {
    profiling: 'timeline'
});
