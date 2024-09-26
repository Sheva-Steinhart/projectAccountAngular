require('dotenv').config();
const { v4 } = require('uuid')
const { MongoOprations } = require('../services/mongo-operations')

const { MONGO_ACCOUNTING_DB, MONGO_CUSTOMERS_COLLECTION } = process.env;
const mongoOprations = new MongoOprations(MONGO_ACCOUNTING_DB)

const createNewCustomer = async (customer) => {
    const client = await existCustomer(customer.name);
    if (client) {
        const error = {
            message: `username '${customer.name}' is not available`,
            type: 422
        }
        throw error
    }
    const id = v4();
    customer.id = id;
    try {
        mongoOprations.Collection = MONGO_CUSTOMERS_COLLECTION;
        await mongoOprations.insertItem(customer);
        return customer;
    }
    catch (error) {
        throw error;
    }
}

const getAllCustomers = async () => {
    mongoOprations.Collection = MONGO_CUSTOMERS_COLLECTION;
    try {
        const response = await mongoOprations.getAllItems();
        return response;
    }
    catch (error) {
        throw error;
    }
}


const existCustomer = async (name) => {
    mongoOprations.Collection = MONGO_CUSTOMERS_COLLECTION;

    if (name == undefined || name == null) {
        throw new Error('name is not defined')
    }
    if (typeof (name) !== 'string') {
        throw new Error('name must be type of string')
    }
    try {
        const response = await mongoOprations.find({ filter: { name } })
        return response.length > 0;
    }
    catch (error) {
        throw error;
    }
}


const getCustomerByName = async (name) => {
    mongoOprations.Collection = MONGO_CUSTOMERS_COLLECTION;

    if (name == undefined || name == null) {
        throw new Error('name is not defined')
    }
    if (typeof (name) !== 'string') {
        throw new Error('name must be type of string')
    }
    try {
        const response = await mongoOprations.find({ filter: { name } })
        return response;
    }
    catch (error) {
        throw error;
    }
}

module.exports = { existCustomer, createNewCustomer, getAllCustomers, getCustomerByName }