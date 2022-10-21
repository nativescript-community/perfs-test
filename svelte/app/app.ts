/*
In NativeScript, the app.ts file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first page.
*/

import { svelteNativeNoFrame } from 'svelte-native'
import { registerNativeViewElement } from 'svelte-native/dom';
import App from './App.svelte'

registerNativeViewElement('WrapLayout', () => require('@nativescript/core').WrapLayout);
registerNativeViewElement('ScrollView', () => require('@nativescript/core').ScrollView);
registerNativeViewElement('Label', () => require('@nativescript/core').Label);

svelteNativeNoFrame(App, {})
