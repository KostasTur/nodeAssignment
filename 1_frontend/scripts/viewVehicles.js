// ENDPOINTS
import { VEHICLES_ENDPOINT } from './modules/endpoints.js';
//  Variables
const tableBodyEl = document.querySelector('#vehiclesTable');
const buttons = document.querySelectorAll('button');
// Functions

const renderVehicles = (uri) => {
  fetch(uri)
    .then((res) => res.json())
    .then((data) => {
      tableBodyEl.innerHTML = data.reduce((t, c) => {
        t += `
            <tr>
            <td>${c.model}</td>
            <td>${c.hour_priceVAT.toFixed(2)}€</td>
            <td>${c.numbe_plate}</td>
            <td>${c.country_location}</td>

          </tr>
            `;
        return t;
      }, '');
    });
};
const selectFilter = (e) => {
  renderVehicles(VEHICLES_ENDPOINT + e.target.dataset.id);
};
// Events
document.addEventListener(
  'DOMContentLoaded',
  renderVehicles(VEHICLES_ENDPOINT)
);
buttons.forEach((btn) => btn.addEventListener('click', selectFilter));
