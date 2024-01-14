module.exports = {
    id: 'org.nativescript.svelte.perfs',
    appPath: 'app',
    appResourcesPath: '../shared/App_Resources',
    android: {
        codeCache: true,
        markingMode: 'none'
    },
    cssParser: 'rework',
    hooks: [
        {
            type: 'after-prepareNativeApp',
            script: '../shared/scripts/after-prepareNativeApp.js'
        }
    ]
};
