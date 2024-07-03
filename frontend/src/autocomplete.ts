const getOpportunitiesData = async (): Promise<string[]> => {
	// https://restcountries.com/v3.1/all
	const opportunitiesRes = await fetch('https://restcountries.com/v2/all');
	const data = (await opportunitiesRes.json()) as {name: string}[]; //will parse data into a json object
	return data.map(country => country.name);
};

export const initialiseAutocomplete = (): void => {
	const roleNamesPromise = getOpportunitiesData();

	const createAutoCompleteDropdown = (
		ul: HTMLUListElement,
		roleNames: readonly string[],
	): void => {
		ul.append(
			...roleNames.map(role => {
				const listItem = document.createElement('li');

				const roleButton = document.createElement('button');
				roleButton.textContent = role;
				listItem.append(roleButton);

				return listItem;
			}),
		);
	};

	const removeAutoCompleteDropdown = (ul: HTMLUListElement): void => {
		[...ul.childNodes].forEach(ul.removeChild.bind(ul));
	};

	const onInputChange =
		(input: HTMLInputElement, ul: HTMLUListElement) => (): void => {
			removeAutoCompleteDropdown(ul);

			const value = input.value.toLowerCase();
			if (!value.length) return;

			roleNamesPromise
				.then(roleNames =>
					createAutoCompleteDropdown(
						ul,
						roleNames.filter(
							role => role.slice(0, value.length).toLowerCase() === value,
						),
					),
				)
				.catch(console.error);
		};

	for (const autocompleteDiv of document.getElementsByClassName(
		'autocomplete-input',
	)) {
		const input = autocompleteDiv.querySelector('input')!;
		const ul = autocompleteDiv.querySelector('ul')!;
		input.addEventListener('input', onInputChange(input, ul));
	}
};
