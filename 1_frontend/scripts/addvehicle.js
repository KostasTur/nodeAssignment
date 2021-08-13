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
  const numberPlate = e.target.numberPlate.value;
  const regex = /[^A-Z0-9]+/;
  e.preventDefault();
  if (numberPlate.length != 6) {
    messageEl.innerText = 'Number plate must be of six digits.';
    return;
  }
  if (numberPlate.match(regex)) {
    messageEl.innerText = 'Only capital letters and numbers are allowed!';
    return;
  }
  if (!modelSelectEl.value || !countrySelectEl.value || !numberPlate) {
    messageEl.innerText =
      'please select model, country and insert number plate.';
    return;
  }
  let vehicle = {
    model_id: modelSelectEl.value,
    number_plate: numberPlate,
    country_location: countrySelectEl.value,
  };

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
