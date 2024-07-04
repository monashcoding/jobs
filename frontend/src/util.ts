export const onReady = (fn: () => void): void =>
	document.readyState === 'loading'
		? document.addEventListener('DOMContentLoaded', fn)
		: fn();
