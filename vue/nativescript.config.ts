import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'org.nativescript.vue.perfs',
  appPath: 'app',
  appResourcesPath: 'App_Resources',
  android: {
    codeCache: true,
    markingMode: 'none'
  },
  cssParser: 'rework',
  hooks: [
      {
          type: 'after-prepareNativeApp',
          script: 'scripts/after-prepareNativeApp.js'
      }
  ]
} as NativeScriptConfig;