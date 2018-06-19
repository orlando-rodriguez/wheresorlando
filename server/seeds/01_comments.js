
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      return knex('comments').insert([
        {
         id: 1,
         title: 'Nice place',
         body: 'nice upstairs area to work in with couches, etc. Great spot to grab food as well! ',
         location_id: 3
       },{
         id: 2,
         title: 'Sam Jones',
         body: 'great open area with free wifi, tons of leather couches and places to sit. Nice bar as well!',
         location_id: 2
       },{
         id: 3,
         title: 'Cozy spot',
         body: 'Cool building, lots of glass and steel. People are pretty friendly.',
         location_id: 1
       }
      ]);
    }).then(() => {
      return knex.raw('ALTER SEQUENCE comments_id_seq RESTART WITH 4;')
    });
};
