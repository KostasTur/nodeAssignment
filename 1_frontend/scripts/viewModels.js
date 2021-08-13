import { MODELS_ENDPOINT, MODELSCOUNT_ENDPOINT } from './modules/endpoints.js';
// Variables
const modelsTableEl = document.querySelector('#modelsTable');
const modelsCountTableEl = document.querySelector('#modelsCountTable');
// Functions
const displayTables = () => {
  fetch(MODELS_ENDPOINT)
    .then((response) => response.json())
    .then((data) => {
      modelsTableEl.innerHTML = data.reduce((t, c) => {
        t += `
            <tr>
            <td>${c.name}</td>
            <td>${c.hour_price}€</td>
          </tr>
            `;
        return t;
      }, '');
    });
  fetch(MODELSCOUNT_ENDPOINT)
    .then((response) => response.json())
    .then((data) => {
      modelsCountTableEl.innerHTML = data.reduce((t, c) => {
        t += `
            <tr>
            <td>${c.name}</td>
            <td>${c.hour_price}€</td>
            <td>${c.vehicles_count}</td>

          </tr>
            `;
        return t;
      }, '');
    });
};
// Events
document.addEventListener('DOMContentLoaded', displayTables);
