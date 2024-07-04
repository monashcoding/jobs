// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
	{
		ignores: ['frontend/dist/**', 'backend/dist/**', 'shared/dist/**'],
	},
	{
		linterOptions: {
			reportUnusedDisableDirectives: 'warn',
		},
		languageOptions: {
			ecmaVersion: 2020,
			parserOptions: {
				project: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
	{
		files: ['backend/**/*.ts'],
		languageOptions: {
			ecmaVersion: 2022,
		},
	},
	eslint.configs.recommended,
	...tseslint.configs.strictTypeChecked,
	...tseslint.configs.stylisticTypeChecked,
	eslintPluginPrettierRecommended,
	{
		rules: {
			'@typescript-eslint/explicit-function-return-type': 'error',
			'@typescript-eslint/no-confusing-void-expression': 'off',
			'@typescript-eslint/no-misused-promises': [
				'warn',
				{checksVoidReturn: false},
			],
			'@typescript-eslint/no-non-null-assertion': 'off',
			'@typescript-eslint/no-unused-vars': 'off', // checked by tsc
			'prettier/prettier': 'warn',
		},
	},
	{
		files: ['**/*.js'],
		...tseslint.configs.disableTypeChecked,
	},
);
