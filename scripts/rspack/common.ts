import { resolve } from 'node:path';

import { defineConfig } from '@rspack/cli';
import rspack from '@rspack/core';
import type { Config as SwcConfig } from '@swc/core';

import { isDev } from './utils.js';

const inCwd = (relativePath: string) => resolve(import.meta.dirname, '../../', relativePath);

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
        new rspack.HtmlRspackPlugin({
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
                        sourceMaps: isDev,
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
                            targets: isDev ? {} : undefined,
                        },
                    } satisfies SwcConfig,
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
                            sourceMap: isDev,
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
