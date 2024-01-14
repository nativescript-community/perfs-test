const { relative } = require("path");

const shared = relative(process.cwd(), __dirname);
const loggingEnabled = !!process.env['NS_LOGGING'];
const timelineEnabled = !!process.env['NS_TIMELINE'];
module.exports = {
    appPath: 'app',
    appResourcesPath: shared + '/App_Resources',
    forceLog: loggingEnabled,
    profiling: timelineEnabled ? 'timeline' : undefined,
    android: {
        maxLogcatObjectSize: 40960,
        codeCache: true,
        markingMode: 'none',
        forceLog: loggingEnabled
    },
    cssParser: 'rework',
    hooks: [
        {
            type: 'after-prepareNativeApp',
            script: shared + '/scripts/after-prepareNativeApp.js'
        }
    ]
};
