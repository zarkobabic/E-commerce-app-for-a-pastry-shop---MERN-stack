require('dotenv').config();
require('express-async-errors');


const express = require('express');
const app = express();

const connectDB = require('./db/connect');
const promotionsRouter = require('./routes/promotionsRouter');
const cakesRouter = require('./routes/cakesRouter');
const cookiesRouter = require('./routes/cookiesRouter');
const usersRouter = require('./routes/usersRouter');
const notificationsRouter = require('./routes/notificationsRouter');
const ordersRouter = require('./routes/ordersRouter');

const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');
const cors = require('cors');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors())


// middleware
app.use(express.json());

// routes

app.get('/', (req, res) => {
  res.send('<h1>SlatkiZalogaji API</h1>');
});

app.use('/api/v1/notifications', notificationsRouter);
app.use('/api/v1/promotions', promotionsRouter);
app.use('/api/v1/cakes', cakesRouter);
app.use('/api/v1/cookies', cookiesRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/orders', ordersRouter);

// error routes

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 4000;

const start = async () => {
  try {
    // connectDB
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
