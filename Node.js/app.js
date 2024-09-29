const express = require('express');
const cors = require('cors');
const app = express();
// const customerRouter = require('./routers/customers.router');
// const suppliersRouter = require('./routers/suppliers.router');
// const expensesRouter = require('./routers/expenses.router');
// const invoiceRouter = require('./routers/invoice.router')

app.get('/', (req, res) => {
    res.status(200).send('hello to our server');
});

app.use(cors({
    origin: 'http://localhost:4200'
}));

// app.use('/customr', customerRouter);
// app.use('/suppliers', suppliersRouter)
// app.use('/expenses', expensesRouter);
// app.use('/invoices', invoiceRouter);

app.get('/*', (req, res) => {
    res.status(400).send('error');
});

module.exports = app;