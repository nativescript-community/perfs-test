import { createApp, registerElement } from 'nativescript-vue';
import App from './App.vue'
import CollectionView from '@nativescript-community/ui-collectionview/vue3';
import { Img } from '@nativescript-community/ui-image';
import { Label } from '@nativescript-community/ui-label';


registerElement('Image', () => Img, { overwriteExisting: true });
registerElement('Label', () => Label, { overwriteExisting: true });

//console.log('__DISABLE_CSS__', __DISABLE_CSS__);


const app = createApp(App);
app.use(CollectionView);
app.start();