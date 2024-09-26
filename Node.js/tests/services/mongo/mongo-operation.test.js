require('dotenv').config();
const { getClient } = require('../../../services/mongo-connection');
const { MongoOprations } = require('../../../services/mongo-operations');
const { openConnection } = require('../../../services/mongo-connection')

const { TEST_MONGO_SERVER, TEST_MONGO_COLLECTION, TEST_MONGO__DB, MONGO_CUSTOMERS_COLLECTION, MONGO_INVOICE_DB } = process.env

describe('MongoOperations', () => {
    let mongo;

    beforeAll(async () => {
        await openConnection(TEST_MONGO_SERVER)
        mongo = new MongoOprations(TEST_MONGO__DB);
    });

    afterAll(async () => {
        const client = getClient();
        client.close();
    })

    it('get collection should return collection', async () => {
        const client = getClient();
        mongo.myCollection = client.db(TEST_MONGO__DB).collection(TEST_MONGO_COLLECTION);
        const collectionName = mongo.Collection;
        expect(collectionName).toBe(TEST_MONGO_COLLECTION)
    });

    it('insertItem should insert an item into the collection', async () => {
        expect.assertions(2);
        const client = getClient();
        mongo.myCollection = client.db(TEST_MONGO__DB).collection(TEST_MONGO_COLLECTION);
        const testItem = { "name": "ronen" };
        const result = await mongo.insertItem(testItem);

        expect(result).toBeDefined();
        expect(result.acknowledged).toBeTruthy();


    });

    it('insertList should insert a list into the collection', async () => {
        expect.assertions(3);
        const client = getClient();
        mongo.myCollection = client.db(TEST_MONGO__DB).collection(TEST_MONGO_COLLECTION);
        const testList = [{ name: "ronen" }, { name: "chaya" }, { name: "gila" }];
        const result = await mongo.insertList(testList);

        expect(result).toBeDefined();
        expect(result.acknowledged).toBeTruthy();
        expect(result.insertedCount).toEqual(3)

    });

    it('find should filter a item from a collection', async () => {
        let mongo = new MongoOprations(MONGO_INVOICE_DB);
        const client = getClient();
        mongo.myCollection = client.db(MONGO_INVOICE_DB).collection(MONGO_CUSTOMERS_COLLECTION);
        const name = 'david';
        const result = await mongo.find({ filter: { name } });
        expect(result).toBeDefined();
        expect(result[0].name).toEqual(name)
    })

});