const path = require('path');
const nsWebpack = require('@nativescript/webpack');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const { resolve } = require('path');
const IgnoreNotFoundExportPlugin = require('./scripts/IgnoreNotFoundExportPlugin');

const {
  getPlatformName,
} = require('@nativescript/webpack/dist/helpers/platform');

const solid = (config, env) => {
  const platform = getPlatformName();

  config.resolve.extensions
    .prepend('.js')
    .prepend('.ts')
    .prepend('.tsx')
    .prepend('.jsx')
    .prepend(`.${platform}.js`)
    .prepend(`.${platform}.ts`)
    .prepend(`.${platform}.jsx`)
    .prepend(`.${platform}.tsx`);

  config.resolve.alias
    .set(
      'solid-js/universal',
      path.resolve(
        __dirname,
        `node_modules/solid-js/universal/dist/${
          env.production ? 'universal' : 'dev'
        }.js`
      )
    )
    .set(
      'solid-js',
      path.resolve(
        __dirname,
        `node_modules/solid-js/dist/${env.production ? 'solid' : 'dev'}.js`
      )
    );

  config.module
    .rule('bundle-source')
    .test(/\.(|t|j)sx$/)
    .exclude.add(/node_modules/)
    .end()
    .use('babel-loader')
    .loader('babel-loader')
    .before('ts-loader')
    .options({
      babelrc: false,
      configFile: false,
      presets: [
        [
          'babel-preset-solid',
          {
            moduleName: '@dominative/solid',
            generate: 'universal',
          },
        ],
      ],
      env: {
        development: {
          plugins: [['solid-refresh/babel', { bundler: 'webpack5' }]],
        },
      },
    });

  if (!env.production) {
    config.output.devtoolNamespace('app');
    config.devServer.hotOnly(true);
    config.devServer.hot(true);
  }
};

module.exports = (env) => {
    nsWebpack.init(env);

    nsWebpack.chainWebpack(solid);

    const config = nsWebpack.resolveConfig();
    require('../../shared/webpack.config')(env, config, __dirname);

    return config;
};
