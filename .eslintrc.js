import { defineConfig } from 'eslint-define-config';

export default defineConfig({
    extends: ['@yutengjing/eslint-config-react'],
    overrides: [
        {
            files: ['scripts/**/*.js'],
            rules: {
                'import/extensions': [
                    2,
                    {
                        js: 'always',
                    },
                ],
            },
        },
    ],
});
