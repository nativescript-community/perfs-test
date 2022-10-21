//@ts-nocheck

import { Application } from '@nativescript/core';
import { registerComponents } from '@dominative/vue';
import { createApp } from 'vue';
import Home from './components/Home.vue';

Object.defineProperty(global, '__DEV__', { value: false });

const app = createApp(Home);

registerComponents(app);

Application.run({
  create: () => {
    document.documentElement.actionBarHidden = true;
    app.mount(document.documentElement);
    return document;
  },
});
