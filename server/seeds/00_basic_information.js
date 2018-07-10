
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('basic_information').del()
    .then(function () {
      return knex('basic_information').insert([
        {
          id: 1,
          name: 'La Catedral',
          description: 'Authentic Cuban Cuisine at affordable prices. Near the Malecon.',
          coordinates: {
            latitude: 23.1356663,
            longitude: -82.40449
          },
          address: 'Calle 8 entre y 5 de Calzada',
          distance: ''
        },
        {
          id: 2,
          name: 'Eiffel Tower',
          description: 'French landmark for representation in the World Fair',
          coordinates: {
            latitude: 48.85837009999999,
            longitude: 2.2944813000000295
          },
          address: 'Champ de Mars, 5 Avenue Anatole France',
          distance: ''
        },
        {
          id: 3,
          name: 'St Peters Bailica',
          description: 'Italian Renaissance church in Vatican City',
          coordinates: {
            latitude: 41.902916,
            longitude: 12.453389000000016
          },
          address: 'Piazza San Pietro, 00120 Città del Vaticano',
          distance: ''
        }
      ]);
    }).then(() => {
      return knex.raw('ALTER SEQUENCE basic_information_id_seq RESTART WITH 4;')
    });
};
