const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');

const DB_URL = 'mongodb://127.0.0.1:27017/mestodb';

const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '6452b9d08366daff014d832e',
  };

  next();
});
app.use(router);

mongoose.connect(DB_URL);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
