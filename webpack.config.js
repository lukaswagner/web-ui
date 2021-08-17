'use strict';

const path = require('path');

/**
 * @returns {import('webpack').Configuration}
 */
module.exports = () => {
    return {
        entry: './src/web-ui.ts',
        mode: 'development',
        devtool: 'source-map',
        resolve: {
            extensions: ['.ts', '...']
        },
        output: {
            filename: 'web-ui.js',
            path: path.resolve(__dirname, 'lib'),
            library: 'web-ui',
            libraryTarget: 'umd',
        },
        module: {
            rules: [
                { test: /\.ts$/, use: { loader: 'ts-loader' } }
            ],
        },
    }
}
