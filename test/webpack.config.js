'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function () {
    return {
        entry: './index.ts',
        mode: 'development',
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.pug$/,
                    use: { loader: 'pug-loader' }
                },
                {
                    test: /\.ts$/,
                    use: { loader: 'ts-loader' }
                },
                {
                    test: /\.css$/,
                    use: [
                        { loader: 'style-loader' },
                        { loader: 'css-loader' }
                    ]
                },
            ],
        },
        resolve: {
            extensions: ['.ts', '...'],
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: './index.pug'
            }),
        ],
    };
};
