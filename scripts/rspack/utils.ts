import { resolve } from 'node:path';

export const isDev = process.env.NODE_ENV === 'development';
export const isProd = !isDev;
export const src = resolve(import.meta.dirname, '../../src');
