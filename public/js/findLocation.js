const allCountryArray = require('../../data/allCountryArray.js');

const countrySelect = document.querySelector('#country');
const stateSelect = document.querySelector('#state');
const citySelect = document.querySelector('#city');
let countrySelectionValue;
let stateSelectionValue;
let statesGot;
let citiesGot = [];
let optionElement;
let textNode;

countrySelect.addEventListener('change', checkCountry);
stateSelect.addEventListener('change', checkState);

function checkCountry(e){
    countrySelectionValue = e.target.value;
    if(!countrySelectionValue) return;
    for(let country of allCountryArray){
        if(country.name == countrySelectionValue){
            statesGot = country.states.map(state => state.name);
            break;
        }
    }
    //console.log(statesGot);
    stateSelect.textContent = '';
    citySelect.textContent = '';
    for(let state of statesGot){
        optionElement = document.createElement('option');
        optionElement.setAttribute('value', state);
        textNode = document.createTextNode(state);
        optionElement.appendChild(textNode);
        stateSelect.appendChild(optionElement);
    }
}

function checkState(e){
    stateSelectionValue = e.target.value;
    if(!stateSelectionValue) return;
    for(let country of allCountryArray){
        if(country.name == countrySelectionValue){
            for(let state of country.states){
                if(state.name == stateSelectionValue){
                    citiesGot = [];
                    for(let city of state.cities){
                        citiesGot.push(city.name);
                    }
                    break;
                }
            }
            break;
        }
    }

    citySelect.textContent = '';
    for(let city of citiesGot){
        optionElement = document.createElement('option');
        optionElement.setAttribute('value', city);
        textNode = document.createTextNode(city);
        optionElement.appendChild(textNode);
        citySelect.appendChild(optionElement);
    }
}