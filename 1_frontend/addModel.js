// ---- POST METHOD ----
MODELS_ENDPOINT = 'http://localhost:5000/models';
// Variables
// Dom Elements
const fromEl = document.querySelector('form');
const messageEl = document.querySelector('#message');
// Functions
const postModel = (e) => {
  e.preventDefault();
  let model = {
    name: e.target.name.value,
    hour_price: e.target.hourPrice.value,
  };
  // console.log(car);
  fetch(MODELS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(model),
  })
    .then((response) => response.json())
    .then((data) => {
      messageEl.innerHTML = data.message;
      //   addDataToSelectElement();
      fromEl.reset();
    })
    .catch((error) => console.log(error.message));
};

// Events
fromEl.addEventListener('submit', postModel);
