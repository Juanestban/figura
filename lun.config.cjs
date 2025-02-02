const { defineLunConfig } = require('lun-cli');

module.exports = defineLunConfig({
  root: 'src',
  defaultTemplate: 'react-ts',
  css: 'module',
  className: 'clsx',
});
