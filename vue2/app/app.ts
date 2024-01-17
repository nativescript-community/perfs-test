import Vue from 'nativescript-vue'
import Home from './components/Home.vue'
import CollectionView from '@nativescript-community/ui-collectionview/vue';
import { Img } from '@nativescript-community/ui-image';
import { Label } from '@nativescript-community/ui-label';

declare let __DEV__: boolean;

Vue.registerElement('Image', () => Img, {overwriteExisting: true});
Vue.registerElement('Label', () => Label, {overwriteExisting: true});
Vue.use(CollectionView);
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = !__DEV__

new Vue({
  render: (h) => h('frame', [h(Home)]),
}).$start()





