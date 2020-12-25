const express = require('express');
const app = express();
const db = require('./db/db');
const logger = require('morgan');
const helmet = require("helmet");
const routes = require('./routes');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errors');
const cors = require('cors');

require('dotenv').config();

app.use(express.json());
app.use(cors());
app.use('/api', auth.jwt);
app.use(errorHandler);
app.use(logger('dev'));
app.use(helmet());
app.use(routes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`server listening on ${PORT}...`);
});

