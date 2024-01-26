import { defineConfig } from '@rspack/cli';
import ReactRefreshPlugin from '@rspack/plugin-react-refresh';
import { merge } from 'webpack-merge';

import commonConfig from './common';

const devConfig = defineConfig({
    mode: 'development',
    devtool: 'eval-source-map',
    experiments: {
        lazyCompilation: true,
        rspackFuture: {
            // @ts-expect-error ...
            disableTransformByDefault: true,
        },
    },
    // @ts-expect-error ...
    plugins: [new ReactRefreshPlugin()],
});

export default merge(commonConfig, devConfig);
