const { getClient } = require('./mongo-connection')

class MongoOprations {
    constructor(dbname) {
        this.database = dbname;
    }
    set Collection(value) {
        this.myCollection = getClient().db(this.database).collection(value);
    }

    get Collection() {
        return this.myCollection.collectionName;
    }

    async getAllItems() {
        const result = await this.myCollection.find({}).toArray();
        return result;
    }

    async insertItem(item) {
        const result = await this.myCollection.insertOne(item);
        return result;
    }

    async insertList(list) {
        const result = await this.myCollection.insertMany(list);
        return result;
    }

    async find({ filter = {} } = {}) {
        const result = this.myCollection.find(filter).toArray();
        return result;
    }
}

module.exports = { MongoOprations };