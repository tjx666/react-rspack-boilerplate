import { defineConfig } from '@rspack/cli';
import ReactRefreshPlugin from '@rspack/plugin-react-refresh';
import { merge } from 'webpack-merge';

import commonConfig from './common.js';

const devConfig = defineConfig({
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        port: 3000,
    },
    experiments: {
        // doesn't with latest rspack
        // lazyCompilation: true,
    },
    plugins: [new ReactRefreshPlugin()],
});

export default merge(commonConfig, devConfig);
