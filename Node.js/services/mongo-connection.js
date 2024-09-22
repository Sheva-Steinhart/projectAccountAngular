const { MongoClient } = require('mongodb')

let client = null
async function openConnection(server) {
    if (server == undefined || server == null) {
        throw new Error('server url is not defined')
    }
    if (typeof (server) !== 'string') {
        throw new Error('server url must be type of string')
    }
    if (!server.trim().startsWith('mongodb://') && !server.trim().startsWith('mongodb+srv://')) {
        throw new Error('server url must start with "mongodb://" or "mongodb+srv://"')
    }
    try {
        client = new MongoClient(server.trim());
        await client.connect();
    }
    catch (error) {
        throw error;
    }
}

async function closeConnection() {
    await Client.close()
}

const getClient = () => client


module.exports = { openConnection, getClient, closeConnection }