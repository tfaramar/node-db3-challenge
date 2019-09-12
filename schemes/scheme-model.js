const db = require('../data/db-config.js');

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update
};

function find() {
    return db('schemes')
};

function findById(id) {
    return db('schemes')
        .where({ id })
        .first();
};

function findSteps(id) {
    return db('steps') 
        .where({'steps.scheme_id': id})
        .select(
            'steps.id',
            'schemes.scheme_name',
            'steps.step_number',
            'steps.instructions'
        )   
        .join('schemes', 'schemes.id', 'steps.scheme_id');       
};

function add(scheme) {
    return db('schemes')
        .insert(scheme, 'id')
        .then(scheme => {
            return scheme
        });
};

function update(changes, id) {
    return db('schemes')
        .update(changes)
        .where({ id })
        .then(updated => updated ? findById(id) : null);
};

function remove(id) {
    return db('schemes')
        .where({ id })
        .del();
};