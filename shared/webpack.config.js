const nsWebpack = require('@nativescript/webpack');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { isAbsolute, relative, resolve } = require('path');
const IgnoreNotFoundExportPlugin = require('./scripts/IgnoreNotFoundExportPlugin');
module.exports = (env, config, dirname) => {
    const platform = env && ((env.android && 'android') || (env.ios && 'ios'));
    const projectRoot = dirname;
    console.log('env', env);
    Object.assign(config.resolve.alias, {
        '@shared': resolve(__dirname)
    });
    let coreModulesPackageName = '@nativescript/core';
    if (env.usefork) {
        console.log('using Akylas fork');
        coreModulesPackageName = '@akylas/nativescript';
        config.resolve.modules = [resolve(dirname, `node_modules/${coreModulesPackageName}`), resolve(dirname, 'node_modules')];

        // config.resolve.symlinks = false;
        Object.assign(config.resolve.alias, {
            '@shared': resolve(__dirname),
            '@nativescript/core': `${coreModulesPackageName}`,
            'tns-core-modules': `${coreModulesPackageName}`
        });
        const nativescriptReplace = '(NativeScript[\\/]dist[\\/]packages[\\/]core|@nativescript/core|@akylas/nativescript)';

        if (env.accessibility === false || env.accessibility === 0) {
            console.log('removing N accessibility');
            config.plugins.push(
                new webpack.NormalModuleReplacementPlugin(/accessibility$/, (resource) => {
                    if (resource.context.match(nativescriptReplace)) {
                        resource.request = '@shared/shims/accessibility';
                    }
                })
            );
        }

        if (!!env.production && !env.timeline) {
            console.log('removing N profiling');
            config.plugins.push(
                new webpack.NormalModuleReplacementPlugin(/profiling$/, (resource) => {
                    if (resource.context.match(nativescriptReplace)) {
                        resource.request = '@shared/shims/profile';
                    }
                }),
                new webpack.NormalModuleReplacementPlugin(/trace$/, (resource) => {
                    if (resource.context.match(nativescriptReplace)) {
                        resource.request = '@shared/shims/trace';
                    }
                })
            );
            config.module.rules.push(
                {
                    // rules to replace mdi icons and not use nativescript-font-icon
                    test: /\.(js)$/,
                    use: [
                        {
                            loader: 'string-replace-loader',
                            options: {
                                search: '^__decorate\\(\\[((\\s|\\t|\\n)*?)profile((\\s|\\t|\\n)*?)\\],.*?,.*?,.*?\\);?',
                                replace: (match, p1, offset, str) => '',
                                flags: 'gm'
                            }
                        }
                    ]
                },
                {
                    // rules to replace mdi icons and not use nativescript-font-icon
                    test: /\.(ts)$/,
                    use: [
                        {
                            loader: 'string-replace-loader',
                            options: {
                                search: '@profile',
                                replace: (match, p1, offset, str) => '',
                                flags: ''
                            }
                        }
                    ]
                },
                // rules to clean up all Trace in production
                // we must run it for all files even node_modules
                {
                    test: /\.(ts|js)$/,
                    use: [
                        {
                            loader: 'string-replace-loader',
                            options: {
                                search: 'if\\s*\\(\\s*Trace.isEnabled\\(\\)\\s*\\)',
                                replace: 'if (false)',
                                flags: 'g'
                            }
                        }
                    ]
                }
            );
        }
    }

    if (env.report) {
        // Generate report files for bundles content
        config.plugins.push(
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                openAnalyzer: false,
                generateStatsFile: true,
                reportFilename: resolve(projectRoot, 'report', 'report.html'),
                statsFilename: resolve(projectRoot, 'report', 'stats.json')
            })
        );
    }

    config.optimization.minimize = env.production;
    config.optimization.minimizer = [
        new TerserPlugin({
            parallel: true,
            terserOptions: {
                ecma: platform === 'android' ? 2020 : 2017,
                module: true,
                toplevel: false,
                keep_classnames: platform !== 'android',
                keep_fnames: platform !== 'android',
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
                    drop_console: env.production && env.noconsole
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
        __DISABLE_CSS__: env.disablecss
    };
    Object.assign(config.plugins.find((p) => p.constructor.name === 'DefinePlugin').definitions, defines);

    const polyfillsPath = resolve(dirname, 'node_modules', coreModulesPackageName);
    config.plugins.unshift(
        new webpack.ProvidePlugin({
            setTimeout: [require.resolve(polyfillsPath + '/timer/index.' + platform), 'setTimeout'],
            clearTimeout: [require.resolve(polyfillsPath + '/timer/index.' + platform), 'clearTimeout'],
            setImmediate: [require.resolve(polyfillsPath + '/timer/index.' + platform), 'setImmediate'],
            setInterval: [require.resolve(polyfillsPath + '/timer/index.' + platform), 'setInterval'],
            clearInterval: [require.resolve(polyfillsPath + '/timer/index.' + platform), 'clearInterval'],
            requestAnimationFrame: [require.resolve(polyfillsPath + '/animation-frame'), 'requestAnimationFrame'],
            cancelAnimationFrame: [require.resolve(polyfillsPath + '/animation-frame'), 'cancelAnimationFrame']
        })
    );
    config.optimization.splitChunks.cacheGroups.defaultVendor.test = function (module) {
        const absPath = module.resource;
        if (absPath) {
            const relativePath = relative(projectRoot, absPath);
            return absPath.indexOf('node_modules') !== -1 || !relativePath || relativePath.startsWith('..') || isAbsolute(relativePath);
        }
        return false;
    };
    config.plugins.push(new IgnoreNotFoundExportPlugin());

    config.plugins.push(new webpack.IgnorePlugin({ resourceRegExp: /reduce-css-calc$/ }));
    config.plugins.push(new webpack.IgnorePlugin({ resourceRegExp: /punnycode$/ }));
    config.plugins.push(new webpack.IgnorePlugin({ resourceRegExp: /^url$/ }));

    return config;
};
