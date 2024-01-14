const nsWebpack = require('@nativescript/webpack');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const { resolve } = require('path');
const IgnoreNotFoundExportPlugin = require('../shared/scripts/IgnoreNotFoundExportPlugin');
module.exports = (env) => {
    nsWebpack.init(env);
    nsWebpack.chainWebpack((config, env) => {
        const ignoredSvelteWarnings = new Set(['a11y-no-onchange', 'a11y-label-has-associated-control', 'illegal-attribute-character']);

        config.module
            .rule('svelte')
            .use('svelte-loader')
            .tap((options) => {
                options.onwarn = function (warning, onwarn) {
                    return ignoredSvelteWarnings.has(warning.code) || onwarn(warning);
                };
                return options;
            });
        config.when(env.production, (config) => {
            config.module
                .rule('svelte')
                .use('string-replace-loader')
                .loader('string-replace-loader')
                .before('svelte-loader')
                .options({
                    search: 'createElementNS\\("https:\\/\\/svelte.dev\\/docs\\/special-elements#svelte-options"',
                    replace: 'createElementNS(svN',
                    flags: 'gm'
                })
                .end();
        });

        return config;
    });
    const config = nsWebpack.resolveConfig();
    const platform = env && ((env.android && 'android') || (env.ios && 'ios'));

    let coreModulesPackageName = '@nativescript/core';
    if (env.usefork) {
        console.log('using Akylas fork');
        coreModulesPackageName = '@akylas/nativescript';
        config.resolve.modules = [resolve(__dirname, `node_modules/${coreModulesPackageName}`), resolve(__dirname, 'node_modules')];

        // config.resolve.symlinks = false;
        Object.assign(config.resolve.alias, {
            '@shared': resolve(__dirname, '..', 'shared'),
            '@nativescript/core': `${coreModulesPackageName}`,
            'tns-core-modules': `${coreModulesPackageName}`
        });
        const nativescriptReplace = '(NativeScript[\\/]dist[\\/]packages[\\/]core|@nativescript/core)';

        // if (!!env.production && !env.timeline) {
        //     console.log('removing N profiling');
        //     config.plugins.push(
        //         new webpack.NormalModuleReplacementPlugin(/profiling$/, (resource) => {
        //             if (resource.context.match(nativescriptReplace)) {
        //                 resource.request = '@shared/shims/profile';
        //             }
        //         }),
        //         new webpack.NormalModuleReplacementPlugin(/trace$/, (resource) => {
        //             if (resource.context.match(nativescriptReplace)) {
        //                 resource.request = '@shared/shims/trace';
        //             }
        //         })
        //     );
        //     config.module.rules.push(
        //         {
        //             // rules to replace mdi icons and not use nativescript-font-icon
        //             test: /\.(js)$/,
        //             use: [
        //                 {
        //                     loader: 'string-replace-loader',
        //                     options: {
        //                         search: /__decorate\(\[((\s|\t|\n)*?)([a-zA-Z]+\.)?profile((\s|\t|\n)*?)\],.*?,.*?,.*?\);?/gm,
        //                         replace: (match, p1, offset, str) => '',
        //                         flags: 'gm'
        //                     }
        //                 }
        //             ]
        //         },
        //         {
        //             // rules to replace mdi icons and not use nativescript-font-icon
        //             test: /\.(ts)$/,
        //             use: [
        //                 {
        //                     loader: 'string-replace-loader',
        //                     options: {
        //                         search: '@profile',
        //                         replace: (match, p1, offset, str) => '',
        //                         flags: ''
        //                     }
        //                 }
        //             ]
        //         },
        //         // rules to clean up all Trace in production
        //         // we must run it for all files even node_modules
        //         {
        //             test: /\.(ts|js)$/,
        //             use: [
        //                 {
        //                     loader: 'string-replace-loader',
        //                     options: {
        //                         search: /if\s*\(\s*Trace.isEnabled\(\)\s*\)/gm,
        //                         replace: (match, p1, offset, str) => 'if (false)',
        //                         flags: 'g'
        //                     }
        //                 }
        //             ]
        //         }
        //     );
        // }
    }
    config.plugins.unshift(
        new webpack.ProvidePlugin({
            svN: '~/svelteNamespace'
        })
    );

    config.optimization.minimize = env.production;
    config.optimization.minimizer = [
        new TerserPlugin({
            parallel: true,
            terserOptions: {
                ecma: 2020,
                module: true,
                toplevel: false,
                keep_classnames: true,
                keep_fnames: true,
                output: {
                    comments: false,
                    semicolons: false
                },
                mangle: {
                    properties: {
                        reserved: ['__metadata'],
                        regex: /^(m[A-Z])/
                    }
                },
                compress: {
                    booleans_as_integers: false,
                    // The Android SBG has problems parsing the output
                    // when these options are enabled
                    collapse_vars: platform !== 'android',
                    sequences: platform !== 'android',
                    passes: 3,
                    drop_console: !!env.production && !!env.noconsole
                }
            }
        })
    ];
    const defines = {
        process: 'global.process',
        'global.TNS_WEBPACK': 'true',
        'global.autoLoadPolyfills': false,
        __UI_USE_EXTERNAL_RENDERER__: true,
        __UI_USE_XML_PARSER__: false,
        'global.__AUTO_REGISTER_UI_MODULES__': false,
        __DISABLE_CSS__: env.disablecss
    };
    Object.assign(config.plugins.find((p) => p.constructor.name === 'DefinePlugin').definitions, defines);
    config.plugins.unshift(
        new webpack.ProvidePlugin({
            setTimeout: [require.resolve(coreModulesPackageName + '/timer/index.' + platform), 'setTimeout'],
            clearTimeout: [require.resolve(coreModulesPackageName + '/timer/index.' + platform), 'clearTimeout'],
            setImmediate: [require.resolve(coreModulesPackageName + '/timer/index.' + platform), 'setImmediate'],
            setInterval: [require.resolve(coreModulesPackageName + '/timer/index.' + platform), 'setInterval'],
            clearInterval: [require.resolve(coreModulesPackageName + '/timer/index.' + platform), 'clearInterval'],
            requestAnimationFrame: [require.resolve(coreModulesPackageName + '/animation-frame'), 'requestAnimationFrame'],
            cancelAnimationFrame: [require.resolve(coreModulesPackageName + '/animation-frame'), 'cancelAnimationFrame']
        })
    );
    config.plugins.push(new IgnoreNotFoundExportPlugin());

    config.plugins.push(new webpack.IgnorePlugin({ resourceRegExp: /reduce-css-calc$/ }));
    config.plugins.push(new webpack.IgnorePlugin({ resourceRegExp: /punnycode$/ }));
    config.plugins.push(new webpack.IgnorePlugin({ resourceRegExp: /^url$/ }));

    return config;
};
