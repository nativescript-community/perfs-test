import { Application} from '@nativescript/core';
import { Frame, Page, Button,  GridLayout, StackLayout, AbsoluteLayout,WrapLayout, ScrollView, Label} from 'dominative';
import { registerComponents } from '@nativescript-community/vue';
import { createApp } from 'vue';
import Home from './components/Home.vue';
import { registerElement, makeListView } from 'dominative'
// import { Img } from '@nativescript-community/ui-image';
// import { Label } from '@nativescript-community/ui-label';

Object.defineProperty(global, '__DEV__', { value: false });

// registerElement('Frame', Frame);
// registerElement('Page', Page);
// registerElement('Image', Img);
// registerElement('GridLayout', GridLayout);
// registerElement('StackLayout', StackLayout);
// registerElement('AbsoluteLayout', AbsoluteLayout);
registerElement('WrapLayout', WrapLayout);
registerElement('ScrollView', ScrollView);
// registerElement('Button', Button);
registerElement('Label', Label);

const app = createApp(Home);

registerComponents(app);

Application.run({
  create: () => {
    app.mount(document.body);
    return document;
  },
});
