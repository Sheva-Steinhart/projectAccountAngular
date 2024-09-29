require('dotenv').config();
const { MongoOprations } = require('../services/mongo-operations')
const { MONGO_ACCOUNTING_DB, MONGO_EXPENSES_COLLECTION } = process.env;
const mongoOprations = new MongoOprations(MONGO_ACCOUNTING_DB)

const createNewExpenses = async (expenses) => {
    try {
        mongoOprations.Collection = MONGO_EXPENSES_COLLECTION;
        await mongoOprations.insertItem(expenses);
        return expenses;
    }
    catch (error) {
        throw error;
    }
}

const getAllExpenses = async () => {
    mongoOprations.Collection = MONGO_EXPENSES_COLLECTION;
    try {
        const response = await mongoOprations.getAllItems();
        return response;
    }
    catch (error) {
        throw error;
    }
}

const getExpensesByMonth = async (month) => {
    const response = await getAllExpenses();
    const data = response.filter(expense => {
        const date = new Date(expense.date);
        const stringMonth = String(date.getMonth() + 1);
        return stringMonth === month;
    })
    return data;
}

const getExpensesByYear = async (year) => {
    const response = await getAllExpenses();
    const data = response.filter(expense => {
        const date = new Date(expense.date);
        const stringYear = String(date.getFullYear());
        return stringYear === year;
    })
    return data;
}

const getExpensesBetweenDates = async (startDate, endDate) => {
    mongoOprations.Collection = MONGO_EXPENSES_COLLECTION;

    if (startDate == undefined || startDate == null || endDate == undefined || endDate == null) {
        throw new Error('Both start date and end date must be defined');
    }
    if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
        throw new Error('Both start date and end date must be of type Date');
    }

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

module.exports = { createNewExpenses, getAllExpenses, getExpensesByMonth, getExpensesByYear, getExpensesBetweenDates }