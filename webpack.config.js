const path = require('path');
const AntDesignThemePlugin = require('antd-theme-webpack-plugin');

const options = {
  stylesDir: path.join(__dirname, './styles'),
  antDir: path.join(__dirname, './node_modules/antd'),
  varFile: path.join(__dirname, './styles/variables.less'),
  mainLessFile: path.join(__dirname, './styles/index.less'),
  themeVariables: [
    '@primary-color',
    '@body-background',
  /*  '@secondary-color',
    '@text-color',
    '@text-color-secondary',
    '@heading-color',
    '@layout-body-background',
    '@btn-primary-bg',
    '@layout-header-background'*/
  ],
  indexFileName: 'index.html'
}
module.exports = function (webpackConfig) {
  webpackConfig.babel.plugins.push('transform-runtime');
  webpackConfig.babel.plugins.push(['import', {
    libraryName: 'antd',
    style: 'css',
  }]);
  webpackConfig.plugins.push(new AntDesignThemePlugin(options));
  return webpackConfig;
};
