import {initialiseAutocomplete} from './autocomplete';

import './styles/footer.css';
import './styles/navbar.css';
import './styles/search-bar.css';
import './styles/style.css';

const main = (): void => {
	initialiseAutocomplete();
};

document.readyState === 'loading'
	? document.addEventListener('DOMContentLoaded', main)
	: main();
