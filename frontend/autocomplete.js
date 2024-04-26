// https://restcountries.com/v3.1/all

const inputE1 = document.querySelector("#autocomplete-input");

inputE1.addEventListener("input", onInputChange)

getOpportunitiesData()

let roleNames = [];

async function getOpportunitiesData() {
    const opportunitesRes = await fetch("https://restcountries.com/v2/all")

    const data = await opportunitesRes.json(); //will parse data into a json object

    console.log(data);

    roleNames = data.map((country) => {
        return country.name;
    });

}

function onInputChange() {
    removeAutoCompleteDropdown();

    const value = inputE1.value.toLowerCase();

    if(value.length === 0)return;

    const filteredNames = []
    
    roleNames.forEach((role) => {
        if (role.substr(0, value.length).toLowerCase() === value)
            filteredNames.push(role);
    });

    createAutoCompleteDropdown(filteredNames);
}


function createAutoCompleteDropdown(list) {
    const listE1 = document.createElement("ul");
    listE1.className = "autocomplete-list";
    listE1.id = "autocomplete-list";

    list.forEach((role) => {
        const listItem = document.createElement("li");
        
        const RoleButton = document.createElement("button");
        RoleButton.innerHTML = role;
        listItem.appendChild(RoleButton);



        listE1.appendChild(listItem);

        
    });

    document.querySelector("#autocomplete-wrapper").appendChild(listE1); 

}



function removeAutoCompleteDropdown() {
    const listE1 = document.querySelector("#autocomplete-list");

    if (listE1) listE1.remove();




}