import { Application } from '@nativescript/core';
import { registerComponents } from '@nativescript-community/vue';
import { createApp } from 'vue';
import Home from './components/Home.vue';

Object.defineProperty(global, '__DEV__', { value: false });

const app = createApp(Home);

registerComponents(app);

globalThis.document = document

Application.run({
  create: () => {
    app.mount(document.body);
    return document;
  },
});
