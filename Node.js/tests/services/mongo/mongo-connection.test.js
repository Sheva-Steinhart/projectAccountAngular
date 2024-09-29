require('dotenv').config();

const { getClient, openConnection, closeConnection } = require('../../../services/mongo/mongo-connection')
const { isConnected } = require('./mongo-helpers')

const { TEST_MONGO_SERVER } = process.env

describe('GET_CLIENT', () => {
    it('client should be defined', () => {
        const client = getClient();
        expect(client).toBeDefined();
    })

    it('client should return null before connection', () => {
        const client = getClient()
        expect(client).toBeNull()
    })
})

describe('OPEN_CONNECTION', () => {
    jest.setTimeout(30500);

    afterEach(async () => {
        const client = getClient();
        await client.close();
    })

    it('client open a connection to a server when serverUrl is provided', async () => {
        await openConnection(TEST_MONGO_SERVER)
        const client = getClient();
        expect(client).not.toBeNull();
    })

    it('client should connected to mongoserver after openConnection', async () => {
        await openConnection(TEST_MONGO_SERVER)
        const client = getClient();
        const response = await isConnected(client);
        expect(response).toBeTruthy();
    })

    describe('EXCEPTION', () => {
        it('should throw error when server url is undefined', async () => {
            expect.assertions(3);
            try {
                await openConnection(undefined)
            }
            catch (error) {
                expect(error).toBeDefined();
                expect(error).toBeInstanceOf(Error);
                expect(error.message).toBe('server url is not defined')
            }
        })

        it('should throw error when server url is null', async () => {
            expect.assertions(3);
            try {
                await openConnection(null);
            }
            catch (error) {
                expect(error).toBeDefined();
                expect(error).toBeInstanceOf(Error);
                expect(error.message).toBe('server url is not defined')
            }
        })

        it('should throw error when server url is not correct', async () => {
            try {
                await openConnection('mongodb://sfghghdfg566545');
            }
            catch (error) {
                expect(error).toBeDefined();
            }
        })

        it('should throw error when server url is not type of string', async () => {
            expect.assertions(3);
            try {
                await openConnection(1234);
            }
            catch (error) {
                expect(error).toBeDefined();
                expect(error).toBeInstanceOf(Error);
                expect(error.message).toBe('server url must be type of string')
            }
        })

        it('should throw error when server url is not start with "mongodb://" or "mongodb+srv://"', async () => {
            expect.assertions(3);
            try {
                await openConnection("1234://dgjj");
            }
            catch (error) {
                expect(error).toBeDefined();
                expect(error).toBeInstanceOf(Error);
                expect(error.message).toBe('server url must start with "mongodb://" or "mongodb+srv://"')
            }
        })

    })

    describe('CLOSE_CONNECTION', () => {
        it('should close connection when connection is open', async () => {
            await openConnection(TEST_MONGO_SERVER);
            closeConnection();
        })
    })
})
