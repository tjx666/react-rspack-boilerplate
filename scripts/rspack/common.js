import { resolve } from 'node:path';

import { defineConfig } from '@rspack/cli';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import { isDev } from './utils.js';

const inCwd = (relativePath) => resolve(import.meta.dirname, '../../', relativePath);

const postcssLoader = {
    loader: 'postcss-loader',
    options: {
        sourceMap: isDev,
        postcssOptions: {
            plugins: isDev ? [] : [['postcss-preset-env']],
        },
    },
};

export default defineConfig({
    target: ['web', 'es5'],
    entry: inCwd('src/index.tsx'),
    output: {
        clean: true,
        path: inCwd('dist'),
        filename: '[name]-[contenthash].js',
    },
    resolve: {
        extensions: ['.js', '.tsx', '.ts'],
    },
    plugins: [
        // @ts-expect-error ...
        new HtmlWebpackPlugin({
            template: inCwd('public/index.html'),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(?:m|c)?(?:js|ts)x?$/,
                exclude: isDev ? /node_modules/ : /node_modules[\\/](?!(antd)[\\/]).*/,
                use: {
                    loader: 'builtin:swc-loader',
                    options: {
                        sourceMap: isDev,
                        jsc: {
                            parser: {
                                syntax: 'typescript',
                                tsx: true,
                                dynamicImport: true,
                                decorators: true,
                            },
                            transform: {
                                react: {
                                    runtime: 'automatic',
                                    development: isDev,
                                    refresh: isDev,
                                },
                            },
                            externalHelpers: true,
                        },
                        env: {
                            targets: isDev ? 'Chrome >= 120' : 'Chrome >= 64',
                        },
                    },
                },
            },
            {
                test: /\.css$/,
                type: 'css',
                use: [postcssLoader],
            },
            {
                test: /\.scss$/,
                type: 'css',
                use: [
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: isDev,
                        },
                    },
                    postcssLoader,
                ],
            },

            {
                test: /\.(bmp|png|apng|jpg|jpeg|gif|svg|webp|avif|heif|jxl)$/,
                type: 'asset/resource',
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024,
                    },
                },
                generator: {
                    filename: 'images/[contenthash][ext]',
                },
            },
            {
                test: /\.(mp3|wav|flac|aac|ogg|aiff)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'audios/[contenthash][ext]',
                },
            },
            {
                test: /\.(mp4|mov|avi|flv|mkv|wmv)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'videos/[contenthash][ext]',
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[contenthash][ext]',
                },
            },
        ],
    },
});
