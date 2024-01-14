/*
In NativeScript, the app.ts file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first page.
*/

import { svelteNative, svelteNativeNoFrame } from 'svelte-native';
// import { Label } from '@nativescript/core';
import { AbsoluteLayout, Button, FlexboxLayout, GridLayout, StackLayout, Trace } from '@nativescript/core';
import { FrameElement, PageElement, registerElement, registerNativeViewElement } from 'svelte-native/dom';
import CollectionViewViewElement from '@nativescript-community/ui-collectionview/svelte';
import { Img } from '@nativescript-community/ui-image';
import { GestureRootView } from '@nativescript-community/gesturehandler';
import { init } from '@nativescript-community/text';
import { Label } from '@nativescript-community/ui-label';
import App from './App.svelte';
import { CollectionViewTraceCategory } from '@nativescript-community/ui-collectionview';
// init();
// Trace.addCategories(CollectionViewTraceCategory)
// Trace.enable()
CollectionViewViewElement.register();
registerElement('frame', () => new FrameElement());
registerElement('page', () => new PageElement());
registerNativeViewElement('Image', () => Img);
registerNativeViewElement('GridLayout', () => GridLayout);
registerNativeViewElement('StackLayout', () => StackLayout);
registerNativeViewElement('AbsoluteLayout', () => AbsoluteLayout);
registerNativeViewElement('Button', () => Button);
registerNativeViewElement('Label', () => Label);
registerNativeViewElement('gesturerootview', () => GestureRootView);

svelteNative(App as any, {});
