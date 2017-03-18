const uuid = require('uuid');
const lorem = require('lorem-ipsum');
const _ = require('lodash');

const names = ["john", "joe", "sophie", "mary.ann", "shlomi", "jospeh", "the.dude"]
const entries = {}

_.times(10).forEach(function() {
    insert(lorem())
})

function list() {
    return _.values(entries)
}

function insert(comment) {
    const id = uuid.v4()
    entries[id] = {
        id: id,
        updatedAt: new Date().getTime(),
        comment: comment,
        email: _.sample(names) + "@acme.com"
    }
}

function update(id, comment) {
    const entry = entries[id]
    if (!entry) {
        throw new Error('Comment with id ' + id + ' doesn\'t exist')
    }

    entry.comment = comment
    entry.updatedAt = new Date().getTime()
    return entry
}

function remove(id) {
    delete entries[id]
}

module.exports = {
    list: list,
    insert: insert,
    update: update,
    remove: remove
}
