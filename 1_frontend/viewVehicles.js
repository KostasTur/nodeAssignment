const hero = {
  name: 'Batman',
  realName: 'Bruce Wayne',
  address: {
    city: 'Gotham',
  },
};

// Object destructuring:
const {
  address: { city },
} = hero;

console.log(hero.address);
