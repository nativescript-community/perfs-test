const nsWebpack = require('@nativescript/webpack');
module.exports = (env) => {
    nsWebpack.init(env);
    require('../shared/webpack.config')(env, config, __dirname);
    return config;
};
