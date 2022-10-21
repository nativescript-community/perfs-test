import mergeOptions from 'merge-options';
export default mergeOptions(require('./nativescript.config'), {
    forceLog: true,
    android: {
        maxLogcatObjectSize: 4096,
        forceLog: true
    }
});
