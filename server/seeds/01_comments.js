
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      return knex('comments').insert([
        {
         id: 1,
         title: 'Great Drinks',
         body: 'Come for the food, stay for the $0.95 drinks! ',
         location_id: 1
       },{
         id: 2,
         title: 'Make a Reservation',
         body: 'Amazing views of Paris but it could take you 4+ hours to visit. Plan ahead and reserve your tickets before your trip.',
         location_id: 2
       },{
         id: 3,
         title: 'Breathtaking',
         body: 'Historic art and architecture will leave you feeling just a little bit empty.',
         location_id: 3
       }
      ]);
    }).then(() => {
      return knex.raw('ALTER SEQUENCE comments_id_seq RESTART WITH 4;')
    });
};
