const express = require('express')
const { createNewExpenses, getAllExpenses, getExpensesByMonth, getExpensesByYear } = require('../modules/expenses')
const router = express.Router()

router.post('/createNewExpenses', express.json(), async (req, res) => {
    try {
        const expenses = req.body;
        const response = await createNewExpenses(expenses);
        res.status(200).json(response);
    }
    catch (error) {
        if (error.type) {
            res.status(error.type).send(error.message);
        }
        else {
            res.status(500).send(error.message);
        }
    }
})

router.get('/getAllExpenses', async (req, res) => {
    try {
        const response = await getAllExpenses();
        res.status(200).send(response);

    }
    catch (error) {
        if (error.type) {
            res.status(error.type).send(error.message);
        }
        else {
            res.status(500).send(error.message);
        }
    }
})

router.get('/getExpensesByMonth/:month', async (req, res) => {
    try {
        const { month } = req.params;
        const data = await getExpensesByMonth(month);
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).send(error.message)
    }
})
router.get('/getExpensesByYear/:year', async (req, res) => {
    try {
        const { year } = req.params;
        const response = await getExpensesByYear(year);
        res.status(200).json({ response });
    }
    catch (error) {
        if (error.type) {
            res.status(error.type).send(error.message);
        }
        else {
            res.status(500).send(error.message);
        }
    }
})

router.get('/between/:startDate/:endDate', async (req, res) => {
    try {

        const { startDate, endDate } = req.params;
        console.log(startDate, endDate);
        const response = await betweenDays(startDate, endDate);
        res.status(200).send(response);
    }
    catch (error) {
        if (error.type) {
            res.status(error.type).send(error.message);
        }
        else {
            res.status(500).send(error.message);
        }
    }
})

module.exports = router