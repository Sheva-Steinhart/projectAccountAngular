require('dotenv').config();
const { existCustomer, createNewCustomer } = require('../../modules/customers');
const { openConnection, getClient } = require('../../services/mongo/mongo-connection');
const { isConnected } = require('../services/mongo/mongo-helpers')

const { TEST_MONGO_SERVER, MONGO_INVOICE_DB, MONGO_CUSTOMERS_COLLECTION } = process.env;

describe('EXIST_CUSTOMER', () => {

    afterEach(async () => {
        const client = getClient();
        const response = await isConnected(client);
        if (response) {
            await client.close();
        }
    });

    it('should return true when the customer is exist', async () => {

        await openConnection(TEST_MONGO_SERVER)
        const response = await existCustomer('david');
        expect(response).toBeTruthy();
    })


    it('should return false when the customer is not exist', async () => {
        await openConnection(TEST_MONGO_SERVER);
        const response = await existCustomer('dan');
        expect(response).not.toBeTruthy();
    })

})

describe('CREATE_NEW_CUSTOMER', () => {
    it('should create customer when customer is not exist', async () => {
        await openConnection(TEST_MONGO_SERVER);
        const name = 'chana'
        const response = await createNewCustomer({ name: name });
        expect(response).toBeDefined();
        expect(response.name).toBe(name);
    })

    it('should throw error when customer is exist', async () => {
        try {
            await openConnection(TEST_MONGO_SERVER);
            await createNewCustomer({ name: "chanan" });
        }
        catch (error) {
            {
                expect(error.message).toBe(`username 'chanan' is not available`)
                expect(error.type).toEqual(422)
            }
        }
    })

    it('should throw error when customer is not an object', async () => {
        try {
            await openConnection(TEST_MONGO_SERVER);
            await createNewCustomer(1234);
        }
        catch (error) {
            {
                expect(error).toBeDefined();
            }
        }
    })
})