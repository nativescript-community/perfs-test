/*
In NativeScript, the app.ts file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first page.
*/

import { svelteNative, svelteNativeNoFrame } from 'svelte-native';
// import { Label } from '@nativescript/core';
import { AbsoluteLayout, Button, FlexboxLayout, GridLayout, StackLayout, Trace, Utils } from '@nativescript/core';
import { FrameElement, PageElement, registerElement, registerNativeViewElement } from 'svelte-native/dom';
import CollectionViewViewElement from '@nativescript-community/ui-collectionview/svelte';
import { Img } from '@nativescript-community/ui-image';
import { init } from '@nativescript-community/text';
import { Label } from '@nativescript-community/ui-label';
import App from './App.svelte';
import { CollectionViewTraceCategory } from '@nativescript-community/ui-collectionview';
// import { updateContentDescription, setAccessibilityDelegate } from '@nativescript/core/accessibility/index.android';
// init();
// Trace.addCategories(CollectionViewTraceCategory)
Trace.addCategories('Accessibility');
Trace.enable()
CollectionViewViewElement.register();
registerElement('frame', () => new FrameElement());
registerElement('page', () => new PageElement());
registerNativeViewElement('Image', () => Img);
registerNativeViewElement('GridLayout', () => GridLayout);
registerNativeViewElement('StackLayout', () => StackLayout);
registerNativeViewElement('AbsoluteLayout', () => AbsoluteLayout);
registerNativeViewElement('Button', () => Button);
registerNativeViewElement('Label', () => Label);

// const start = Date.now();
// const label = new Label();
// label._setupUI(Utils.android.getApplicationContext());
// for (let index = 0; index < 10000; index++) {
    // label._androidContentDescriptionUpdated = true;
    // setAccessibilityDelegate(label);
    // updateContentDescription(label);
    // const layout = new GridLayout();
    // layout.addChild(label);
    // Object.assign(layout, {
    //     id:'testLayout',
    //     columns:'auto,*',
    //     height: 100,
    //     backgroundColor:'red',
    //     borderRadius:10,
    //     verticalAlignment:'center'
    // })
    // Object.assign(label, {
    //     id:'testLabel',
    //     textAlignment:'center',
    //     fontSize:14,
    //     fontWeight:'bold',
    //     textWrap:true,
    //     col:1,
    //     backgroundColor:'green',
    //     borderRadius:4,
    //     verticalAlignment:'center'
    // })
    // layout.callLoaded()
// }
// console.log('test done', Date.now()-start, 'ms');
svelteNative(App as any, {});
