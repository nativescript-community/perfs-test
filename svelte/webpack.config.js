const nsWebpack = require('@nativescript/webpack');
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
    require('../shared/webpack.config')(env, config, __dirname);
    return config;
};
