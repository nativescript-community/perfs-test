const nsWebpack = require('@nativescript/webpack');
module.exports = (env) => {
    nsWebpack.init(env);
    const config = nsWebpack.resolveConfig();
    require('../shared/webpack.config')(env, config, __dirname);
    return config;
};
