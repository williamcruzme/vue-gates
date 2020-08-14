import _Vue from 'vue';
import Gate from './core/gate';
import registerDirectives from './helpers/registerDirectives';

const VuePlugin = {
  install(Vue, options = {}) {
    const gate = new Gate(options);

    Vue.prototype.$gates = gate;
    Vue.gates = gate;

    registerDirectives(Vue);
  },
};

const NuxtModule = (context, inject) => {
  const options = JSON.parse('<%= JSON.stringify(options) %>');
  const gate = new Gate(options);

  inject('gates', gate);
  context.$gates = gate;

  registerDirectives(_Vue);
};

export default process.browser ? VuePlugin : NuxtModule;
