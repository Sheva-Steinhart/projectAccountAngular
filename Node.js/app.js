const express = require('express');
const cors = require('cors');
const app = express();
const customerRouter = require('./routers/customers.router');
const expensesRouter = require('./routers/expenses.router');
const receiptsRouter = require('./routers/receipts.router');

app.get('/', (req, res) => {
    res.status(200).send('hello to our server');
});

app.use(cors({
    origin: 'http://localhost:4200'
}));

app.use('/customer', customerRouter);
app.use('/expenses', expensesRouter);
app.use('/receipts', receiptsRouter);

// app.get('/*', (req, res) => {
//     console.log("===========================");
    
//     res.status(400).send('error');
// });

module.exports = app;