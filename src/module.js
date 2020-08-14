const { resolve } = require('path');

export default function (moduleOptions) {
  const options = {
    ...moduleOptions,
    ...this.options.vueGates,
  };

  this.addPlugin({
    src: resolve(__dirname, './plugin.js'),
    options,
  });
}

module.exports.meta = require('../package.json');
