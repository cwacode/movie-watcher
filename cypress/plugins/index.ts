const webpack = require('@cypress/webpack-preprocessor');
const { VueLoaderPlugin } = require('vue-loader');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');

module.exports = (on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) => {
  const options = {
    webpackOptions: {
      module: {
        rules: [
          {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false
              }
            }
          },
          {
            test: /\.css$/,
            use: ['vue-style-loader', 'css-loader']
          },
          {
            test: /\.s(c|a)ss$/,
            use: [
              'vue-style-loader',
              'css-loader',
              {
                loader: 'sass-loader',
                options: {
                  implementation: require('sass'),
                  sassOptions: {
                    fiber: require('fibers'),
                    indentedSyntax: true // optional
                  },
                },
              },
            ],
          },
        ],
      },
      plugins: [
        new VueLoaderPlugin(),
        new VuetifyLoaderPlugin()
      ],
    },
  };
  on('file:preprocessor', webpack(options));
};
