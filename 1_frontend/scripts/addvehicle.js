// ENDPOINTS
import { MODELS_ENDPOINT, VEHICLES_ENDPOINT } from './modules/endpoints.js';
// ---  RENDERING SELECT OPTIONS ---
// Variables
// DOM
const modelSelectEl = document.querySelector('#modelSelect');
const addDataToSelectElement = () => {
  fetch(MODELS_ENDPOINT).then((response) =>
    response.json().then((data) => {
      let selectOptions = '<option selected>Select Model</option>';
      selectOptions += data.reduce((t, c) => {
        t += `<option value=${c._id}>${c.name}</option>`;
        return t;
      }, '');

      modelSelectEl.innerHTML = selectOptions;
    })
  );
};
document.addEventListener('DOMContentLoaded', addDataToSelectElement);

// ---- POST VEHICLE----
// Variables
// Dom Elements
const fromEl = document.querySelector('form');
const countrySelectEl = document.querySelector('#countrySelect');
const messageEl = document.querySelector('#message');
// Functions
const postVehicle = (e) => {
  e.preventDefault();
  console.log(countrySelectEl.value, modelSelectEl.value);
  let vehicle = {
    model_id: modelSelectEl.value,
    number_plate: e.target.numberPlate.value,
    country_location: countrySelectEl.value,
  };
  console.log(vehicle);

  fetch(VEHICLES_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(vehicle),
  })
    .then((response) => response.json())
    .then((data) => {
      messageEl.innerHTML = data.message;
      fromEl.reset();
    })
    .catch((error) => console.log(error.message));
};

// Events
fromEl.addEventListener('submit', postVehicle);
