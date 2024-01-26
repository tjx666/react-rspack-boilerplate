import type { definePlugin } from '@rspack/cli';

export const isDev = process.env.NODE_ENV === 'development';
export const isProd = !isDev;

export type RspackPluginInstance = ReturnType<typeof definePlugin>;
