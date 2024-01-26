import { defineConfig } from '@rspack/cli';
import rspack from '@rspack/core';
import { merge } from 'webpack-merge';

import commonConfig from './common.js';

const prodConfig = defineConfig({
    mode: 'production',
    devtool: false,
    // performance: {
    //     // 2MiB
    //     maxEntrypointSize: 1024 * 1024 * 2,
    // },
    experiments: {
        rspackFuture: {
            newTreeshaking: true,
        },
    },
    optimization: {
        runtimeChunk: {
            name: 'runtime',
        },
        splitChunks: {
            cacheGroups: {
                lib: {
                    test: /[/\\]node_modules[/\\](react|react-dom|antd)[/\\]/,
                    name: 'lib',
                    chunks: 'all',
                },
                vendor: {
                    test: /[/\\]node_modules[/\\]/,
                    name: 'vendor',
                    chunks: 'all',
                },
            },
        },
        minimize: true,
        minimizer: [
            new rspack.SwcJsMinimizerRspackPlugin(),
            new rspack.SwcCssMinimizerRspackPlugin(),
        ],
    },
});

export default merge(commonConfig, prodConfig);
