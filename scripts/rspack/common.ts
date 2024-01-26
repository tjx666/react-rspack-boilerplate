import { resolve } from 'node:path';

import { defineConfig } from '@rspack/cli';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import { isDev, type RspackPluginInstance } from './utils';

const inCwd = (relativePath: string) => resolve(import.meta.dirname, '../../', relativePath);

export default defineConfig({
    target: ['web', 'es5'],
    entry: inCwd('src/index.tsx'),
    output: {
        clean: true,
        path: inCwd('dist'),
    },
    resolve: {
        extensions: ['.js', '.tsx', '.ts'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: inCwd('public/index.html'),
        }) as unknown as RspackPluginInstance,
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
            },
            {
                test: /\.scss$/,
                type: 'css',
                use: [
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
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
                    filename: 'images/[hash][ext]',
                },
            },
            {
                test: /\.(mp3|wav|flac|aac|ogg|aiff)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'audios/[hash][ext]',
                },
            },
            {
                test: /\.(mp4|mov|avi|flv|mkv|wmv)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'videos/[hash][ext]',
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[hash][ext]',
                },
            },
        ],
    },
});
