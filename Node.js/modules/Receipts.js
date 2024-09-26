require('dotenv').config();

const { MongoOprations } = require('../services/mongo-operations')

const { MONGO_ACCOUNTING_DB, MONGO_RECEIPTS_COLLECTION } = process.env;

const mongoOprations = new MongoOprations(MONGO_ACCOUNTING_DB)

const createNewReceipts = async (Receipts) => {
    try {
        mongoOprations.Collection = MONGO_RECEIPTS_COLLECTION;
        await mongoOprations.insertItem(Receipts);
        return Receipts;
    }
    catch (error) {
        throw error;
    }
}

const getAllReceipts = async () => {
    mongoOprations.Collection = MONGO_RECEIPTS_COLLECTION;

    try {
        const response = await mongoOprations.getAllItems();
        return response;
    }
    catch (error) {
        throw error;
    }
}


const getReceiptsBetweenDays = async (startDate, endDate) => {
    mongoOprations.Collection = MONGO_RECEIPTS_COLLECTION;
    const filter = {
        'date': {
            $gte: startDate,
            $lte: endDate
        }
    };

    try {
        const response = await mongoOprations.find({ filter });
        return response;
    }
    catch (error) {
        throw error;
    }
}
const getReceiptsByCustName = async (cn) => {
    mongoOprations.Collection = MONGO_RECEIPTS_COLLECTION;

    try {
        const response = await mongoOprations.getAllItems();
        return response.filter(r => r.customer === cn);
    }
    catch (error) {
        throw error;
    }

}


const getReceiptsByMonth = async (month) => {
    const response = await getAllReceipts();
    const data = response.filter(Receipts => {
        const date = new Date(Receipts.date);
        const stringMonth = String(date.getMonth() + 1);
        return stringMonth === month;
    })
    return data;
}

const getReceiptsByYear = async (year) => {
    const response = await getAllReceipts();
    const data = response.filter(Receipts => {
        const date = new Date(Receipts.date);
        const stringYear = String(date.getFullYear());
        return stringYear === year;
    })
    return data;
}

module.exports = { getReceiptsByYear, getReceiptsByMonth, getReceiptsByCustName, getReceiptsBetweenDays, getAllReceipts, createNewReceipts, };
