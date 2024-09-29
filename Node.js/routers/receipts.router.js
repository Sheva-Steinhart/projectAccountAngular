const express = require('express');
const { createNewReceipts, getAllReceipts, getReceiptsBetweenDays, getReceiptsByCustName, getReceiptsByYear, getReceiptsByMonth } = require('../modules/Receipts');
const router = express.Router();

router.post('/createNewReceipts', express.json(), async (req, res) => {
    try {
        const receipt = req.body;
        const response = await createNewReceipts(receipt);
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

router.get('/getAllReceipts', async (req, res) => {
    try {

        const response = await getAllReceipts();
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

router.get('/getReceiptsBetweenDays/:startDate/:endDate', async (req, res) => {
    try {

        const { startDate, endDate } = req.params;
        console.log(startDate, endDate);
        const response = await getReceiptsBetweenDays(startDate, endDate);
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

router.get('/getReceiptsByCustName/:name', async (req, res) => {
    try {

        const { name } = req.params;
        console.log({ name });
        const response = await getReceiptsByCustName(name);
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

router.get('/getReceiptsByMonth/:month', async (req, res) => {
    try {
        const { month } = req.params;
        const response = await getReceiptsByMonth(month);
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

router.get('/getReceiptsByYear/:year', async (req, res) => {
    try {
        const { year } = req.params;
        const response = await getReceiptsByYear(year);
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

module.exports = router;