import { platformNativeScript, registerElement, runNativeScriptAngularApp } from '@nativescript/angular';

import { AppModule } from './app/app.module';
registerElement('HTMLLabel', () => require('@nativescript-community/ui-label').Label);
runNativeScriptAngularApp({
  appModuleBootstrap: () => platformNativeScript().bootstrapModule(AppModule),
});

