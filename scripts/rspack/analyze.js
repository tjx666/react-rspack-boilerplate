import { RsdoctorWebpackPlugin } from '@rsdoctor/webpack-plugin';
import { defineConfig } from '@rspack/cli';
import { merge } from 'webpack-merge';

import prodConfig from './prod.js';

const analyzeConfig = defineConfig({
    plugins: [new RsdoctorWebpackPlugin({})],
});

console.log('analyze mode!');

export default merge(prodConfig, analyzeConfig);
