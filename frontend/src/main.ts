import {initialiseAutocomplete} from './autocomplete';

import './navbar.css';
import './search-bar.css';
import './style.css';

const main = (): void => {
	initialiseAutocomplete();
};

document.readyState === 'loading'
	? document.addEventListener('DOMContentLoaded', main)
	: main();
