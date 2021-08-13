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
            <td>${c.hour_priceVAT}€</td>
            <td>${c.numbe_plate}</td>
            <td>${c.country_location}</td>

          </tr>
            `;
        return t;
      }, '');
    });
};
const selectFilter = (e) => {
  console.log(e.target.dataset.id);
  renderVehicles(VEHICLES_ENDPOINT + e.target.dataset.id);

  // switch (e.target.innerText.includes())
  // {
  //   case 'All':renderVehicles(VEHICLES_ENDPOINT);
  //   break;
  //   case 'Lit':renderVehicles(VEHICLES_ENDPOINT+'lt')

  // }
};
// Events
document.addEventListener(
  'DOMContentLoaded',
  renderVehicles(VEHICLES_ENDPOINT)
);
buttons.forEach((btn) => btn.addEventListener('click', selectFilter));
