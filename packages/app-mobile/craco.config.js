const { log } = require('console');
const path = require('path')
const fs = require('fs')

module.exports = {
    // ...
    webpack: {
        configure: (webpackConfig, { env, paths }) => {
            return webpackConfig;
        },
    },
};