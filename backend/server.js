const express = require('express');
const app = express();
const cors = require('cors');
const userRouter = require('./routers/userRouter');
const salaryRouter = require('./routers/salaryRouter');
const loanRouter = require('./routers/loanRouter');
const subscriptionRouter = require('./routers/subcriptionRouter');
const expenseRouter = require('./routers/expenseRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/users', userRouter);
app.use('/salary', salaryRouter);
app.use('/loan', loanRouter);
app.use('/subscriptions', subscriptionRouter);
app.use('/expense', expenseRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
