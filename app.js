const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');
const handleError = require('./middlewares/handleError');

const DB_URL = 'mongodb://127.0.0.1:27017/mestodb';

const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json());

mongoose.connect(DB_URL);
app.use(router);

app.use(handleError);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
