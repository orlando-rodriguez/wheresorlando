const database = require('./database-connection');


module.exports = {
    listPlaces(){
        return database('basic_information');
    },
    readPlace(id){
        return database('basic_information')
            .select()
            .where('id', id)
            .first();
    },
    createPlace(location){
        return database('basic_information')
            .insert(location)
            .returning('*')
            .then(record => record[0]);
    },
    updateCoords(id, value){
        return database('basic_information')
            .where('id', id)
            .update('coordinates', value)
            .returning('*')
            .then(record => record[0]);
    },
    deletePlace(id){
        return database('basic_information')
            .delete()
            .where('id', id);
    },
    listComments(){
        return database('comments').select();
    },
    readComments(id){
        return database('comments')
            .select()
            .where('location_id', id);
    },
    createComment(comment) {
        return database('comments')
            .insert(comment)
            .returning('*')
            .then(record => record[0]);
    },
    updateComment(id, value) {
        return database('comments')
            .where('id', id)
            .update(comment, value)
            .returning('*')
            .then(record => record[0]);
    },
    deleteComment(id){
        return database('comments')
            .delete()
            .where('id', id);
    }
}
