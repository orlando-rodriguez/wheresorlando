
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('basic_information').del()
    .then(function () {
      return knex('basic_information').insert([
        {
          id: 1,
          name: 'Galvanize',
          description: 'A large building that hosts the Galvanize programming school downstairs and many tech businesses on the other floors.',
          coordinates: {
            latitude: 39.7576196,
            longitude: -105.0069694
          },
          address: '1644 Platte Street, Denver',
          distance: ''
        },
        {
          id: 2,
          name: 'Union Station',
          description: 'The main transit hub for downtown Denver.',
          coordinates: {
            latitude: 39.7526509,
            longitude: -105.00168500000001
          },
          address: '1701 Wynkoop Street, Denver',
          distance: ''
        },
        {
          id: 3,
          name: 'Whole Foods',
          description: 'A large natural foods store near Union Station.',
          coordinates: {
            latitude: 39.7546184,
            longitude: -105.00139919999998
          },
          address: '1701 Wewatta Street, Denver',
          distance: ''
        }
      ]);
    }).then(() => {
      return knex.raw('ALTER SEQUENCE basic_information_id_seq RESTART WITH 4;')
    });
};
