import NuxtModule from './module';
import VuePlugin from './plugin';

export default process.browser ? VuePlugin : NuxtModule;
